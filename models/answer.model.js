const mongoose = require("mongoose");

const answerchema = new mongoose.Schema({
  answer_a: {
    type: string,
    required: true,
  },
  answer_b: {
    type: string,
  },
  answer_c: {
    type: string,
  },
  answer_d: {
    type: string,
  },
  correct_answer: {
    type: string,
    required: true,
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

const Answer = mongoose.model("Answer", answerchema);
module.exports = Answer;
