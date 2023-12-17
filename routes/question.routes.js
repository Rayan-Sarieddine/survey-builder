const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestonsOfSurvey,
  updateQuestionById,
  deleteQuestion,
} = require("../controllers/question.controllers");
router.post("/", createQuestion);
router.get("/:id", getAllQuestonsOfSurvey);
router.put("/:id", updateQuestionById);
router.delete("/:id", deleteQuestion);

module.exports = router;
