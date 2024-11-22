import express from "express";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import globalErrorHandler from "./controllers/errorControl.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const DB = process.env.LOCAL_DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
app.use("/api/auth", authRouter);
app.use(globalErrorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
