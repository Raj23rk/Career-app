const Answer = require("../models/Answer");

exports.submitAnswers = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    const savedAnswers = answers.map(a => ({
      userId,
      questionId: a.questionId,
      answerValue: a.answerValue
    }));

    await Answer.insertMany(savedAnswers);

    res.json({ message: "Assessment submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};