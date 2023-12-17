const express = require("express");
const router = express.Router();
const {
  createAnswer,
  getAlAnswersOfQuestion,
  updateAnswerById,
  deleteAnswer,
} = require("../controllers/answer.controllers");
router.post("/", createAnswer);
router.get("/:id", getAlAnswersOfQuestion);
router.put("/:id", updateAnswerById);
router.delete("/:id", deleteAnswer);

module.exports = router;
