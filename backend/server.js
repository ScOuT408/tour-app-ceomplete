import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import tourRoute from "./routes/tourRoute.js";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

app.use(express.json({ limit: "50mb", extended: true }));
app.use(cors());

// db config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected !!!");
  })
  .catch(() => {
    console.log("Error While Connection");
  });

const port = process.env.PORT;

// routes
app.use("/api/users", userRoute);
app.use("/api/tours", tourRoute);

app.listen(port, () => console.log(`The Server is listening on ${port}`));
