const express = require("express");
const router = express.Router();

const Question = require("../models/question");
const Test = require("../models/test");

router.get("/get-questions/:testId", async (req, res) => {
  const testId = req.params.testId;
  try {
    if (!testId) {
      return res.status(400).json({ message: "Test ID is required." });
    }
    const questions = await Question.find({ testId }).sort({ index: 1 });
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for the given test." });
    }
    // console.log(questions);
    res.status(200).json({
      message: "Questions retrieved successfully.",
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching questions." });
  }
});

router.get("/get-all-tests/:id", async (req, res) => {
  const adminId = req.params.id;
  try {
    const tests = await Test.find({ adminId: adminId }).sort({ date: 1 });
    const totalTests = await Test.countDocuments({ adminId: adminId });

    if (!tests || tests.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for the given test." });
    }
    res.status(200).json({ tests, totalTests });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Error fetching questions." });
  }
});

router.get("/get-test-details/:id", async (req, res) => {
  const testId = req.params.id;
  try {
    const testDetails = await Test.find({ _id: testId });

    if (!testDetails) {
      return res
        .status(404)
        .json({ message: "No questions found for the given test." });
    }
    res.status(200).json({ testDetails });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Error fetching questions." });
  }
});

module.exports = router;
