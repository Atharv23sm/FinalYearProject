const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  startTime: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("test", testSchema);
