import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide a category title"],
      unique: [true, "please make the category title unique"],
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const CategoryModel =
  mongoose.models?.categories || mongoose.model("categories", categorySchema);
