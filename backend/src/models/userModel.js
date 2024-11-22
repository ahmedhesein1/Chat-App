import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
    },
    fullName: {
      type: String,
      required: [true, "full Name Is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 8 characters long"],
      select: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", User);
