"use server";

import { connectToDB } from "@/models/connection";
import { getCurrentUser } from "./users";
import { CartType, ProductType } from "@/types";
import { CartModel } from "@/models/cart";
import { ProductModel } from "@/models/products";
import { revalidatePath } from "next/cache";

export const getCartProducts = async () => {
  try {
    connectToDB();
    // get the current user
    const currentUser = await getCurrentUser();
    const userCart = await CartModel.findOne<CartType>({
      userId: currentUser?.id,
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
    return {
      cartProducts,
      count: cartProducts?.length,
    };
  } catch (error) {
    throw new Error("could'nt get cart products");
  }
};
export const addToCart = async (productId: string, quantity: number) => {
  try {
    connectToDB();
    // get the current user
    const currentUser = await getCurrentUser();
    // check if its in cart first
    const cart = await CartModel.findOne<CartType>({
      userId: currentUser?.id,
      "products.id": productId,
    }); // Find the product within the cart
    const productInCart = cart?.products?.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      // if its in cart update it
      await CartModel.findOneAndUpdate(
        {
          userId: currentUser?.id,
          "products.id": productId,
        },
        {
          $set: { "products.$.quantity": quantity },
        }
      );
    } else {
      // if its not in cart add it
      await CartModel.findOneAndUpdate(
        {
          userId: currentUser?.id,
        },
        {
          $push: { products: { id: productId, quantity } },
        }
      );
    }
    revalidatePath("/");
    revalidatePath("/shop");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
export const removeFromCart = async (productId: string) => {
  try {
    connectToDB();
    // get the current user
    const currentUser = await getCurrentUser();
    // update the user cart
    await CartModel.findOneAndUpdate(
      {
        userId: currentUser?.id,
      },
      {
        $pull: { products: { id: productId } },
      }
    );
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/cart");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
export const clearCart = async () => {
  try {
    connectToDB();
    // get the current user
    const currentUser = await getCurrentUser();
    // update the user cart
    await CartModel.findOneAndUpdate(
      {
        userId: currentUser?.id,
      },
      {
        products: [],
      }
    );
    revalidatePath("/cart");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
