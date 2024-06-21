"use server";

import { CartModel } from "@/models/cart";
import { connectToDB } from "@/models/connection";
import { ProductModel } from "@/models/products";
import { UserModel } from "@/models/users";
import { CartType, ProductType, UserType } from "@/types";
import { revalidatePath } from "next/cache";

export const getUserProductsFromCart = async (username: string) => {
  try {
    connectToDB();
    const user = await UserModel.findOne({ username });
    const userCart = await CartModel.findOne<CartType>({
      userId: user.id,
    });
    // get all the products
    const promises = userCart?.products.map(async ({ id, quantity }) => {
      const product = await ProductModel.findById(id);
      return { product, quantity };
    });
    const cartProducts = await Promise.all<{
      product: ProductType;
      quantity: number;
    }>(promises!);
    return cartProducts;
  } catch (error) {
    throw new Error("coud'nt get User Products From Cart please try agine");
  }
};
export const deleteUserProductFromCart = async (
  username: string,
  productId: string
) => {
  try {
    connectToDB();
    const user = await UserModel.findOne<UserType>({ username });
    await CartModel.findOneAndUpdate(
      {
        userId: user?.id,
      },
      {
        $pull: { products: { id: productId } },
      }
    );
  } catch (error) {
    throw new Error("coud'nt delete User Product From Cart");
  }
  revalidatePath("/dashboard/carts");
};
