import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a category title"],
  },
  img: {
    type: String,
  },
});
export const CategoryModel =
  mongoose.models?.categories || mongoose.model("categories", categorySchema);
