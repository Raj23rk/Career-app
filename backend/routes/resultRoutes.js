const express = require("express");
const router = express.Router();

const {
  calculateResult,
  getResult
} = require("../controllers/resultController");

router.post("/calculate", calculateResult);

router.get("/:userId", getResult);

module.exports = router;