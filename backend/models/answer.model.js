const mongoose = require("mongoose");

const answerchema = new mongoose.Schema({
  answers: {
    type: Object,
    required: true,
  },
  correct_answers: {
    type: Object,
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
