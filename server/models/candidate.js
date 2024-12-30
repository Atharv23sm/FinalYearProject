const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  registeredTests: [
    {
      testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true,
      },
      regesteredAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Candidate", candidateSchema);
