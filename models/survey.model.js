const mongoose = require("mongoose");

const surveyschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
