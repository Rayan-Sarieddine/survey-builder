const Question = require("../models/question.model");
const Survey = require("../models/survey.model");
const createQuestion = async (req, res) => {
  const { question, explanation, survey_id } = req.body;
  console.log(req.body);
  try {
    const survey = await Survey.findById(survey_id);
    console.log(survey);
    if (!survey) {
      res.status(400).send({ message: "survey not found" });
    }

    const newquestion = new Question({
      question,
      explanation,
      survey_id,
    });
    await newquestion.save();
    res.status(200).send({ success: true });
  } catch (e) {
    res.status(500).send({ message: "server error" });
  }
};
const getAllQuestonsOfSurvey = async (req, res) => {
  const id = req.params.id;
  try {
    const surveyquestions = await Question.find({ survey_id: id });
    res.status(200).send({ questions: surveyquestions });
  } catch (e) {
    res.status(500).send({ message: "server error" });
  }
};
const updateQuestionById = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const update = await Question.findByIdAndUpdate({ _id: id }, updatedData, {
      new: true,
    });
    res.status(200).send({ message: "updated", survey: update });
    if (!update) {
      res.status(404).send({ message: "failed to update" });
    }
  } catch (e) {
    res.status(500).send({ message: "server error" });
  }
};

const deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).send({ message: "Failed to delete" });
    }
    res.status(200).send({ message: "question deleted successfully" });
  } catch (e) {
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  createQuestion,
  getAllQuestonsOfSurvey,
  updateQuestionById,
  deleteQuestion,
};
