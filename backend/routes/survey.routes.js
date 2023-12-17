const express = require("express");
const router = express.Router();
const {
  createsurvey,
  getAllSurveys,
  getSurveyById,
  updateSurveyById,
  deleteSurvey,
} = require("../controllers/survey.controllers");
router.post("/", createsurvey);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);
router.put("/:id", updateSurveyById);
router.delete("/:id", deleteSurvey);

module.exports = router;
