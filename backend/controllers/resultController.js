const Answer = require("../models/Answer");
const Career = require("../models/Career");
const calculateCareerScores = require("../utils/careerLogic");

// POST /api/result/calculate
exports.calculateResult = async (req, res) => {
  try {
    const { userId } = req.body;
    const answers = await Answer.find({ userId });

    if (!answers.length) {
      return res.status(404).json({ message: "No answers found for this user" });
    }

    const scores = await calculateCareerScores(answers);
    const sortedClusters = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    let results = [];
    for (let [cluster, score] of sortedClusters) {
      const career = await Career.findOne({ careerCluster: cluster });
      results.push({
        fitPercentage: score,
        careerDetails: career || { careerCluster: cluster, careerRole: "Unknown" }
      });
    }

    res.json({ topMatches: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/result/:userId
exports.getResult = async (req, res) => {
  try {
    const userId = req.params.userId;
    const answers = await Answer.find({ userId });
    
    if (!answers.length) {
      return res.status(404).json({ message: "No result found" });
    }

    const scores = await calculateCareerScores(answers);
    const sortedClusters = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    let results = [];
    for (let [cluster, score] of sortedClusters) {
      const career = await Career.findOne({ careerCluster: cluster });
      results.push({
        fitPercentage: score,
        careerDetails: career || { careerCluster: cluster, careerRole: "Unknown", description: "No description available.", courses: [], skills: { technical: [], soft: [] }, actionPlan: {}, backupCareers: [] }
      });
    }

    res.json({ topMatches: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};