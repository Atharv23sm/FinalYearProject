const express = require("express");
const router = express.Router();
const sendMail = require("../utils/mailer");
const authenticate = require("../middleware/authenticate");
const Question = require("../models/question");
const Test = require("../models/test");
const Candidate = require("../models/candidate");
const CandidateTestData = require("../models/candidateTestData");
const candidateAuthenticate = require("../middleware/candidateAuthenticate");

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
    res.status(500).json({
      message:
        "An error occurred while fetching questions, please try again later.",
    });
  }
});

router.get("/get-test-details/:id", async (req, res) => {
  const testId = req.params.id;
  try {
    const testDetails = await Test.findOne({ _id: testId });

    if (!testDetails) {
      return res.status(404).json({ message: "No test found." });
    }
    // const testObjectId = mongoose.Types.ObjectId(testId);
    const registeredCount = await Candidate.countDocuments({
      "registeredTests.testId": testId,
    });
    // console.log(Total candidates registered for test ${testId}: ${registeredCount});
    const submittedCount = await CandidateTestData.countDocuments({ testId });

    res.status(200).json({ testDetails, registeredCount, submittedCount });
  } catch (error) {
    console.error("Error fetching test details:", error);
    res.status(500).json({
      message: "Error fetching test details, please try again later.",
    });
  }
});

router.get("/get-all-tests/:id", async (req, res) => {
  const adminId = req.params.id;
  try {
    const tests = await Test.find({ adminId: adminId }).sort({ date: 1 });
    const totalTests = await Test.countDocuments({ adminId: adminId });

    if (!tests || tests.length === 0) {
      return res.status(404).json({ message: "No tests found." });
    }
    res.status(200).json({ tests, totalTests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({
      message:
        "An error occurred while fetching tests, please try again later.",
    });
  }
});

router.delete("/delete-test/:testId", async (req, res) => {
  const testId = req.params.testId;
  try {
    const test = await Test.findByIdAndDelete(testId);
    await Question.deleteMany({ testId: testId });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: `Test has been deleted successfully.` });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/test-results/:testId", async (req, res) => {
  const testId = req.params.testId;
  try {
    const allCandidates = await Candidate.find({
      "registeredTests.testId": testId,
    }).select("name email");

    if (allCandidates.length === 0) {
      return res
        .status(404)
        .json({ message: "No Candidate found for the given test." });
    }
    const candidatesWithScore = await Promise.all(
      allCandidates.map(async (candidate) => {
        const testData = await CandidateTestData.findOne({
          testId,
          candidateId: candidate._id,
        }).select("score wasCheating");

        return {
          name: candidate.name,
          email: candidate.email,
          score: testData ? testData.score : null,
          wasCheating: testData ? testData.wasCheating : null,
        };
      })
    );
    // console.log(candidatesWithScore);
    return res.status(200).json({
      message: "Candidates fetched successfully.",
      results: candidatesWithScore,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching results." });
  }
});

router.post("/send-test-mails/:testId", authenticate, async (req, res) => {
  const { testId } = req.params;
  const adminName = req.userName;
  const testLink = req.body.testLink;

  try {
    const subject = "Invitation to Participate in Your Upcoming Test.";
    const testDetails = await Test.findOne({ _id: testId });
    if (!testDetails) {
      return res.status(404).json({ message: "No test found." });
    }
    const testDate = testDetails.date.toString().slice(0, 15);
    const testTime = testDetails.startTime;
    const text = `Dear Candidate, You have been invited to participate in the test scheduled for ${testDate} - ${testTime}. Please use the following link to access the test: ${testLink}
    Ensure you complete the test within the given time frame. If you have any questions, feel free to contact us.
    Best regards,
    ${adminName}`;

    const html = `<p>Dear Candidate,</p>
            <p>You have been invited to participate in the test scheduled for <b>${testDate} - ${testTime}</b>. Please use the following link to access the test:</p>
            <p><a href="${testLink}">Start Your Test</a></p>
            <p>Ensure you complete the test within the given time frame. If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br>${adminName}</p>`;

    const candidates = await Candidate.find({
      "registeredTests.testId": testId,
    });

    if (candidates.length === 0) {
      return res
        .status(404)
        .json({ message: `No candidates found for testId: ${testId}` });
    }

    const emailPromises = candidates.map((candidate) =>
      sendMail(candidate.email, subject, text, html)
    );

    await Promise.all(emailPromises);

    res.status(404).json({
      message: "Emails sent successfully",
      totalEmails: candidates.length,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/check-candidate-attempt",
  candidateAuthenticate,
  async (req, res) => {
    const { testId } = req.body;
    const candidateId = req.candidateId;

    try {
      const testData = await CandidateTestData.findOne({
        testId,
        candidateId: candidateId,
      });

      if (testData) {
        return res.json({ isFirstAttempt: false });
      } else {
        return res.json({ isFirstAttempt: true });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Server error, please try again later." });
    }
  }
);

router.post("/submit-test", candidateAuthenticate, async (req, res) => {
  const { testId, selectedOption, wasCheating } = req.body;
  const candidateId = req.candidateId;
  // console.log(testId);
  // console.log(candidateId)
  // console.log(selectedOption)
  try {
    if (!testId || !candidateId || !selectedOption) {
      return res.status(404).json({ message: "Missing required fields" });
    }

    const test = await Test.findById(testId);
    const candidate = await Candidate.findById(candidateId);

    if (!test || !candidate) {
      return res.status(404).json({ message: "Test or Candidate not found" });
    }

    const questions = await Question.find({ testId }).sort({ index: 1 });
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for the given test." });
    }
    let score = 0;
    const totalQuestions = questions.length;
    // console.log(selectedOption);
    const submittedAnswers = questions.map((question) => {
      const isCorrect =
        question.correctAnswer === selectedOption[question.index - 1];
      if (isCorrect) score += 1;
      return {
        questionId: question._id,
        selectedOption: selectedOption[question.index - 1],
        isCorrect: isCorrect,
      };
    });

    const candidateTestData = new CandidateTestData({
      candidateId: candidateId,
      testId: testId,
      submittedAnswers: submittedAnswers,
      wasCheating: wasCheating,
      score: score,
      totalQuestions: totalQuestions,
    });

    await candidateTestData.save();

    res.status(200).json({
      message: "Test submitted successfully.",
      score: score,
      totalQuestions: totalQuestions,
      submittedAnswers: submittedAnswers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

module.exports = router;
