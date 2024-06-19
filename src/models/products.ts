import mongoose from "mongoose";
const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide a title"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "please provide a descriptions"],
    },
    price: {
      type: Number,
      required: [true, "please provide a price"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "please provide a category for the product"],
    },
    stock: {
      type: Number,
      required: true,
    },
    img: String,
    color: String,
    size: String,
  },
  {
    timestamps: true,
  }
);
export const ProductModel =
  mongoose.models?.products || mongoose.model("products", productsSchema);
