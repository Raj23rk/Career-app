const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: String,
  category: {
    type: String,
    enum: [
      "interest",
      "aptitude",
      "personality",
      "values",
      "academic_strength",
      "future_scope"
    ]
  },
  careerCluster: String,
  weight: Number
});

module.exports = mongoose.model("Question", questionSchema);