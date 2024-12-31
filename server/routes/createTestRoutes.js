const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require("../utils/cloudinary");
const authenticate = require("../middleware/authenticate");
const Question = require("../models/question");
const Test = require("../models/test");

router.get("/download-template", (req, res) => {
  try {
    const headers = ["Index", "Question", "A", "B", "C", "D", "Correct Answer"];

    const workbook = XLSX.utils.book_new();
    const worksheetData = [headers];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    const filePath = path.join(__dirname, "question_template.xlsx");
    XLSX.writeFile(workbook, filePath);

    res.setHeader(
      "Content-Disposition",
      "attachment;filename=question_template.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.sendFile(filePath, () => {
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error downloading template." });
  }
});

router.post(
  "/create-test",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    const { name, duration, date, time } = req.body;
    const adminId = req.userId;
    const file = req.file;
    // console.log("admin id:", adminId);
    try {
      const test = new Test({ name, adminId, duration, date, startTime: time });
      const savedTest = await test.save();

      if (!savedTest) {
        return res.status(500).json({ message: "Error saving the test." });
      }

      if (file) {
        const workbook = XLSX.read(file.buffer);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const requiredHeaders = [
          "Index",
          "Question",
          "A",
          "B",
          "C",
          "D",
          "Correct Answer",
        ];
        const sheetHeaders = Object.keys(sheetData[0] || {});
        const isValid = requiredHeaders.every((header) =>
          sheetHeaders.includes(header)
        );

        if (!isValid) {
          return res.status(400).json({
            message: "Invalid Excel format. Please use the provided template.",
          });
        }

        const questions = sheetData.map((row) => ({
          index: row["Index"],
          question: row["Question"],
          options: [
            { label: "A", answer: row["A"] },
            { label: "B", answer: row["B"] },
            { label: "C", answer: row["C"] },
            { label: "D", answer: row["D"] },
          ],
          correctAnswer: row["Correct Answer"],
          adminId: adminId,
          testId: savedTest._id,
        }));

        const result = await Question.insertMany(questions);

        for (let i = 0; i < result.length; i++) {
          await Question.findByIdAndUpdate(result[i]._id, { index: i + 1 });
        }
      }
      res
        .status(200)
        .json({ message: "Test created successfully!", test: savedTest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating test." });
    }
  }
);

router.post(
  "/get-test-preview",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    try {
      const adminId = req.userId;
      const file = req.file;
      if (file) {
        const workbook = XLSX.read(file.buffer);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const requiredHeaders = [
          "Index",
          "Question",
          "A",
          "B",
          "C",
          "D",
          "Correct Answer",
        ];
        const sheetHeaders = Object.keys(sheetData[0] || {});
        const isValid = requiredHeaders.every((header) =>
          sheetHeaders.includes(header)
        );

        if (!isValid) {
          return res.status(400).json({
            message: "Invalid Excel format. Please use the provided template.",
          });
        }

        const questions = sheetData.map((row) => ({
          index: row["Index"],
          question: row["Question"],
          options: [
            { label: "A", answer: row["A"] },
            { label: "B", answer: row["B"] },
            { label: "C", answer: row["C"] },
            { label: "D", answer: row["D"] },
          ],
          correctAnswer: row["Correct Answer"],
          adminId: adminId,
        }));
        res.status(200).json({ questions });
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Error fetching questions." });
    }
  }
);

router.post(
  "/upload-image/:questionId",
  upload.single("image"),
  async (req, res) => {
    const { questionId } = req.params;
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        return res
          .status(404)
          .json({ success: false, message: "Question not found." });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded." });
      }

      const result = cloudinary.uploader.upload_stream(
        {
          folder: "question_images",
          public_id: questionId,
          resource_type: "image",
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res
              .status(500)
              .json({ success: false, message: "Cloudinary upload failed." });
          }

          question.image = result.secure_url;
          await question.save();

          res.status(200).json({ success: true, imageUrl: result.secure_url });
        }
      );

      result.end(req.file.buffer);
    } catch (error) {
      console.error("Error uploading image:", error);
      res
        .status(500)
        .json({ success: false, message: "Error uploading image." });
    }
  }
);

router.delete("/delete-image/:questionId", async (req, res) => {
  const { questionId } = req.params;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $set: { image: null } },
      { new: true }
    );

    if (updatedQuestion) {
      return res.status(200).json({
        success: true,
        message: "Image URL set to null successfully",
        question: updatedQuestion, // Return the updated question
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
