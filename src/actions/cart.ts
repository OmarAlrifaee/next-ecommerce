"use server";

import { connectToDB } from "@/models/connection";
import { getCurrentUser } from "./users";
import { CartType, ProductType } from "@/types";
import { CartModel } from "@/models/cart";
import { ProductModel } from "@/models/products";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";

export const getCartProducts = async () => {
  // check if there is a user loggedin
  const isLoggedIn = isUserLoggedIn();
  if (!isLoggedIn) redirect("/login");
  try {
    connectToDB();
    // get the current user
    const currentUser = await getCurrentUser();
    const userCart = await CartModel.findOne<CartType>({
      userId: currentUser?.id,
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
  // check if there is a user loggedin
  const isLoggedIn = isUserLoggedIn();
  if (!isLoggedIn) redirect("/login");
  try {
    connectToDB();
    // get the current user
    const currentUser = await getCurrentUser();
    // check if its in cart first
    const product = await CartModel.findOne({
      userId: currentUser?.id,
      productsIds: productId,
    });
    if (product) throw new Error("product already exist in cart");
    // update the user cart
    await CartModel.findOneAndUpdate(
      {
        userId: currentUser?.id,
      },
      {
        $push: { productsIds: productId },
      }
    );
  } catch (error) {
    throw new Error("could'nt add new product to cart");
  }
  revalidatePath("/");
  revalidatePath("/shop");
};
export const removeFromCart = async (productId: string) => {
  // check if there is a user loggedin
  const isLoggedIn = isUserLoggedIn();
  if (!isLoggedIn) redirect("/login");
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
        $pull: { productsIds: productId },
      }
    );
  } catch (error) {
    throw new Error("could'nt remove product from cart");
  }
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/cart");
};
export const clearCart = async () => {
  // check if there is a user loggedin
  const isLoggedIn = isUserLoggedIn();
  if (!isLoggedIn) redirect("/login");
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
        productsIds: [],
      }
    );
    revalidatePath("/cart");
  } catch (error) {
    throw new Error("could'nt remove all product from cart");
  }
  revalidatePath("/cart");
};
