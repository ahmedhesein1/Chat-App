import mongoose from "mongoose";
export const connectDB = async () => {
  const DB = process.env.LOCAL_DB;
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Database connected Successfully");
    })
    .catch((err) => {
      console.log("Database connection failed", err);
    });
};
