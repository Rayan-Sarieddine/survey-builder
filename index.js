const express = require("express");
const { connectToMongoDb } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const surveyRoutes = require("./routes/survey.routes");
app.use("/survey", surveyRoutes);
const questionRoutes = require("./routes/question.routes");
app.use("/question", questionRoutes);
const answerRoutes = require("./routes/answer.routes");
app.use("/answer", answerRoutes);

app.listen(8000, () => {
  console.log("listening");
  connectToMongoDb();
});
