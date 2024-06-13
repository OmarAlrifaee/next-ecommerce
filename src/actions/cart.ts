"use server";

import { connectToDB } from "@/models/connection";
import { getCurrentUser } from "./users";
import { CartType, ProductType, UserType } from "@/types";
import { CartModel } from "@/models/cart";
import { ProductModel } from "@/models/products";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCartProducts = async () => {
  // check if there is a user loggedin
  if (!cookies().get("token")?.value) redirect("/login");
  try {
    connectToDB();
    // get the current user
    const currentUser: UserType = await getCurrentUser();
    const userCart = await CartModel.findOne<CartType>({
      userId: currentUser.id,
    });
    // get all the products
    const promises = userCart?.productsIds.map(async (productId) => {
      const product = await ProductModel.findById(productId);
      return product;
    });
    const cartProducts = await Promise.all<ProductType>(promises!);
    return {
      cartProducts,
      count: cartProducts?.length,
    };
  } catch (error) {
    throw new Error("could'nt get cart products");
  }
};
export const addToCart = async (productId: string) => {
  try {
    connectToDB();
    // get the current user
    const currentUser: UserType = await getCurrentUser();
    // update the user cart
    await CartModel.findOneAndUpdate(
      {
        userId: currentUser.id,
      },
      {
        $push: { productsIds: productId },
      }
    );
  } catch (error) {
    throw new Error("could'nt add new product to cart");
  }
};
export const removeFromCart = async (productId: string) => {
  try {
    connectToDB();
    // get the current user
    const currentUser: UserType = await getCurrentUser();
    // update the user cart
    await CartModel.findOneAndUpdate(
      {
        userId: currentUser.id,
      },
      {
        $pull: { productsIds: productId },
      }
    );
  } catch (error) {
    throw new Error("could'nt remove product from cart");
  }
};
export const clearCart = async () => {
  try {
    connectToDB();
    // get the current user
    const currentUser: UserType = await getCurrentUser();
    // update the user cart
    await CartModel.findOneAndUpdate(
      {
        userId: currentUser.id,
      },
      {
        productsIds: [],
      }
    );
  } catch (error) {
    throw new Error("could'nt remove all product from cart");
  }
};
