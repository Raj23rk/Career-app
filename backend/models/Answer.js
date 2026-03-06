const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },
  answerValue: Number
});

module.exports = mongoose.model("Answer", answerSchema);