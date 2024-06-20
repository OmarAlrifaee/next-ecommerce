"use server";

import { OrderModel } from "@/models/orders";
import { OrderType } from "@/types";
import { revalidatePath } from "next/cache";

export const getAllOrders = async (search: string = "") => {
  try {
    const searchRegex = new RegExp(search, "i");
    const allOrders = await OrderModel.find<OrderType>({
      username: { $regex: searchRegex },
    });
    return allOrders;
  } catch (error) {
    throw new Error("could'nt get all orders");
  }
};
export const deleteOrder = async (userId: string) => {
  try {
    await OrderModel.findOneAndDelete({ userId });
  } catch (error) {
    throw new Error("could'nt delete a single order");
  }
  revalidatePath("/dashboard/orders");
};