"use server";

import { CartModel } from "@/models/cart";
import { connectToDB } from "@/models/connection";
import { ProductModel } from "@/models/products";
import { UserModel } from "@/models/users";
import { CartType, ProductType } from "@/types";
import { revalidatePath } from "next/cache";

export const getUserProductsFromCart = async (username: string) => {
  try {
    connectToDB();
    const user = await UserModel.findOne({ username });
    const userCart = await CartModel.findOne<CartType>({
      userId: user.id,
    });
    // get all the products
    const promises = userCart?.productsIds.map(async (productId) => {
      const product = await ProductModel.findById(productId);
      return product;
    });
    const cartProducts = await Promise.all<ProductType>(promises!);
    return cartProducts;
  } catch (error) {
    throw new Error("coud'nt get User Products From Cart");
  }
};
export const deleteUserProductFromCart = async (
  username: string,
  productId: string
) => {
  try {
    connectToDB();
    const user = await UserModel.findOne({ username });
    await CartModel.findOneAndUpdate(
      { userId: user.id },
      {
        $pull: { productsIds: productId },
      }
    );
  } catch (error) {
    throw new Error("coud'nt delete User Product From Cart");
  }
  revalidatePath("/dashboard/carts");
};
