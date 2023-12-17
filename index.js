const express = require("express");
const { connectToMongoDb } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

// const authRoutes = require("./routes/auth.routes");
// app.use("/auth", authRoutes);

app.listen(8000, () => {
  console.log("listening");
  connectToMongoDb();
});
