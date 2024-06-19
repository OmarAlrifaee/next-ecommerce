import { getCartProducts } from "@/actions/cart";
import { ProductModel } from "@/models/products";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    // get the cart products first
    const cartProducts = (await getCartProducts()).cartProducts;
    // edit the products stock
    cartProducts.forEach(async ({ product, quantity }) => {
      await ProductModel.findByIdAndUpdate(product.id, {
        $inc: { stock: -quantity },
      });
    });
    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};
