import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
export const signup = asyncHandler(async (req, res, next) => {
  const { name, fullName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError("User Already Existed", 500));
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    fullName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    user: {
      ...newUser._doc,
    },
  });
});
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatched = await bcrypt.compare(password, this.password);
  if (!user || !isMatched) {
    return next(new AppError("Invalid Email or password", 404));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
  res
    .cookie("token", token, { httpOnly: true })
    .status(200)
    .json({
      status: "success",
      token,
      user: {
        ...user._doc,
        token,
      },
    });
});
