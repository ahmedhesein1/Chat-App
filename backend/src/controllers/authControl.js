import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import cloudinary from "../cloudinary/cloudinary.js";
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new AppError("You Are Not Logged In", 500));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User Not found", 500));
  }
  req.id = decoded.id;
  decoded ? next() : next(new AppError("Please Log In And Try Again"));
});
export const signup = asyncHandler(async (req, res, next) => {
  const { name, fullName, email, password, profilePic } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError("User Already Existed", 500));
  }
  const newUser = await User.create({
    name,
    fullName,
    email,
    password,
    profilePic,
  });
  res.status(201).json({
    status: "success",
    user: {
      ...newUser._doc,
      password: undefined,
    },
  });
});
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatched = await bcrypt.compare(password, user.password);
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
        password: undefined,
      },
    });
});
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token").status(200).json({
    status: "success",
    message: "Logged Out Successfully",
  });
});
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { profilePic } = req.body;
  if (!profilePic) {
    return next(new AppError("User Not Found", 500));
  }
  const upload = await cloudinary.uploader.upload(profilePic);
  const user = await User.findByIdAndUpdate(
    req.id,
    {
      profilePic: upload.secure_url,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    status: "success",
    user,
  });
});
export const checkAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    success: true,
    ...user._doc,
    password: undefined,
  });
});