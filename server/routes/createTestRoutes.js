const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authenticate = require("../middleware/authenticate");
const Question = require("../models/question");
const Test = require("../models/test");

router.get("/download-template", (req, res) => {
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

// router.get("/get-all-tests/:id", async (req, res) => {
//   const adminId = req.params.id;
//   try {
//     const tests = await Test.find({ adminId: adminId });
//     const totalTests = await Test.countDocuments({ adminId: adminId });

//     if (!tests || tests.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No questions found for the given test." });
//     }
//     res.status(200).json({ tests, totalTests });
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     res.status(500).json({ message: "Error fetching questions." });
//   }
// });

module.exports = router;
