import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
      unique: true,
      min: 2,
      max: 10,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
    avatar: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const UserModel =
  mongoose.models?.users || mongoose.model("users", usersSchema);
