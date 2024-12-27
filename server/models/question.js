const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },

  question: {
    type: String,
    required: true,
  },

  options: [
    {
      label: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],

  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length > 0 && v.length < 5,
      message: "Correct answer must match one of the provided options.",
    },
  },

  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Admin",
  },

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
});

module.exports = mongoose.model("question", questionSchema);
