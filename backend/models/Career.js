const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  careerCluster: String,
  careerRole: String,
  description: String,
  explanation: String,
  subjectStream: String,
  courses: [String],
  actionPlan: {
    year1: String,
    year2: String,
    year3: String,
    year4: String,
    year5: String
  },
  skills: {
    technical: [String],
    soft: [String]
  },
  futureScope: String,
  backupCareers: [String]
});

module.exports = mongoose.model("Career", careerSchema);