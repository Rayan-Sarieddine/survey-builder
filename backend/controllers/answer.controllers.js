const Answer = require("../models/answer.model");
const Question = require("../models/question.model");

const createAnswer = async (req, res) => {
  const { answer_a, correct_answer, question_id, ...rest } = req.body;

  try {
    const question = await Question.findById(question_id);
    if (!question) {
      res.status(400).send({ message: "question not found" });
    }
    let correct_answers = {
      answer_a_correct: false,
      answer_b_correct: false,
      answer_c_correct: false,
      answer_d_correct: false,
    };
    correct_answers[`answer_${correct_answer}_correct`] = true;
    let answers = {
      answer_a: answer_a,
      ...rest,
    };
    const newanswer = new Answer({
      answers,
      correct_answers,
      question_id,
    });
    await newanswer.save();
    res.status(200).send({ success: true });
  } catch (e) {
    res.status(500).send({ message: "server error" });
  }
};
const getAlAnswersOfQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const surveyanswers = await Answer.find({ question_id: id });
    res.status(200).send({ answer_key: surveyanswers });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
const updateAnswerById = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const update = await Answer.findByIdAndUpdate({ _id: id }, updatedData, {
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
const deleteAnswer = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    if (!deletedAnswer) {
      return res.status(404).send({ message: "Failed to delete" });
    }
    res.status(200).send({ message: "answer deleted successfully" });
  } catch (e) {
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  createAnswer,
  getAlAnswersOfQuestion,
  updateAnswerById,
  deleteAnswer,
};
