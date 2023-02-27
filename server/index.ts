import { Express } from "express";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app: Express = express();
const roomRouter = require("./routes/room");
const MONGODB_URL = "mongodb://localhost:27017/weyeyet";
const PORT = 3000 | Number(process.env.PORT);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
mongoose.set("strictQuery", true);
app.use(bodyParser.json());
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: any) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use("/api/v1/room", roomRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
