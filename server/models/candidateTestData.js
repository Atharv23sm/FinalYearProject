const mongoose = require("mongoose");

const candidateTestDataSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  submittedAnswers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      selectedOption: {
        type: String,
        // required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  wasCheating: {
    type: Boolean,
    // required: true,
    default: false,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("candidateTestData", candidateTestDataSchema);
