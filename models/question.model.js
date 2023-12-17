const mongoose = require("mongoose");

const questionschema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  survey_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
});
