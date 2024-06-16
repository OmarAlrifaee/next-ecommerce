"use server";

import { OrderModel } from "@/models/orders";
import { OrderType } from "@/types";

export const getAllOrders = async (search: string = "") => {
  try {
    const searchRegex = new RegExp(search, "i");
    const allOrders = await OrderModel.find<OrderType[]>();
    return allOrders;
  } catch (error) {
    throw new Error("could'nt get all orders");
  }
};
