const express = require("express");
const router = express.Router();
const { submitAnswers } = require("../controllers/assessmentController");

router.post("/submit", submitAnswers);

module.exports = router;