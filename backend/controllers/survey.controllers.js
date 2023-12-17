const Survey = require("../models/survey.model");
const User = require("../models/user.model");
const createsurvey = async (req, res) => {
  const { title, category, belongs_to } = req.body;
  const user = await User.findById(belongs_to);
  if (!user) {
    res.status(400).send({ message: "user not found" });
  }
  try {
    const survey = new Survey({
      title,
      category,
      belongs_to,
    });
    await survey.save();
    res.status(200).send({ success: true });
  } catch (e) {
    res.status(500).send({ message: "server error" });
  }
};
const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().populate("belongs_to", "name");
    res.status(200).send({ surveys: surveys });
  } catch (e) {
    res.status(500).send({ message: "server error" });
  }
};
const getSurveyById = async (req, res) => {
  try {
    const id = req.params.id;
    const survey = await Survey.findById(id).populate(
      "belongs_to",
      "name email"
    );
    console.log(survey);
    if (!survey) {
      res.status(400).send({ message: "survey not found" });
    }
    res.status(200).send(survey);
  } catch (e) {
    res.status(500).send({ message: "server error" });
  }
};
const updateSurveyById = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const update = await Survey.findByIdAndUpdate({ _id: id }, updatedData, {
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
const deleteSurvey = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSurvey = await Survey.findByIdAndDelete(id);
    if (!deletedSurvey) {
      return res.status(404).send({ message: "Failed to delete" });
    }
    res.status(200).send({ message: "Survey deleted successfully" });
  } catch (e) {
    res.status(500).send({ message: "Server error" });
  }
};
module.exports = {
  createsurvey,
  getAllSurveys,
  getSurveyById,
  updateSurveyById,
  deleteSurvey,
};
