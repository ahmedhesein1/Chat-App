import mongoose from "mongoose";
import bcrypt from "bcrypt";
const User = new mongoose.Schema(
  {
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
      minlength: [4, "Password must be at least 4 characters long"],
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
User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});
export default mongoose.model("User", User);
