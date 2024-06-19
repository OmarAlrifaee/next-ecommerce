import { getCartProducts } from "@/actions/cart";
import { deleteProduct } from "@/actions/products";
import { ProductModel } from "@/models/products";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    // get the cart products first
    const cartProducts = (await getCartProducts()).cartProducts;
    // edit the products stock
    cartProducts.forEach(async ({ product, quantity }) => {
      const editedProduct = await ProductModel.findByIdAndUpdate<ProductType>(
        product.id,
        {
          $inc: { stock: -quantity },
        },
        { new: true }
      );
      if (editedProduct && editedProduct?.stock <= 0) {
        // delete the product from store and carts
        await deleteProduct(editedProduct.id);
      }
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
