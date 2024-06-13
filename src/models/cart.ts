import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "please provide a user id"],
    },
    productsIds: {
      type: [],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export const CartModel =
  mongoose.models?.cart || mongoose.model("cart", cartSchema);
