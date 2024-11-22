import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import Message from "../models/messageModel.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getUserInSidebar = asyncHandler(async (req, res, next) => {
  const loggedIn = req.user._id;
  const filterUsers = await User.find({ _id: { $ne: loggedIn } }).select(
    "-password"
  );
  if (!loggedIn || !filterUsers) {
    return next(new AppError("User not logged in", 400));
  }
  res.status(200).json({
    status: "success",
    users: filterUsers,
  });
});
export const getMessages = asyncHandler(async (req, res, next) => {
  const { id } = req.params.id;
  const myId = req.user._id;
  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: id },
      { senderId: id, receiverId: myId },
    ],
  });
  res.status(200).json(messages);
});
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  let imageUrl;
  const uploadImage = await cloudinary.uploader.upload(image);
  imageUrl = uploadImage.secure_url;
  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  res.status(201).json(newMessage);
});
