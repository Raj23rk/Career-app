const Question = require("../models/Question");

const calculateCareerScores = async (answers) => {
  let clusterScores = {};
  let clusterMaxPossible = {};

  for (let ans of answers) {
    const question = await Question.findById(ans.questionId);
    if (!question) continue;

    const score = (ans.answerValue || 0) * (question.weight || 1);
    const maxScore = 5 * (question.weight || 1); // Assuming 5 is max answer value

    if (!clusterScores[question.careerCluster]) {
      clusterScores[question.careerCluster] = 0;
      clusterMaxPossible[question.careerCluster] = 0;
    }

    clusterScores[question.careerCluster] += score;
    clusterMaxPossible[question.careerCluster] += maxScore;
  }

  // Calculate percentages
  let results = {};
  for (let cluster in clusterScores) {
    results[cluster] = Math.round((clusterScores[cluster] / clusterMaxPossible[cluster]) * 100);
  }

  return results;
};

module.exports = calculateCareerScores;