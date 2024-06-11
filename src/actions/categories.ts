"use server";

import { CategoryModel } from "@/models/categories";
import { connectToDB } from "@/models/connection";
import { CategoryType } from "@/types";

export const getAllCategories = async () => {
  try {
    connectToDB();
    const categories: CategoryType[] = await CategoryModel.find();
    return categories;
  } catch (error) {
    throw new Error("could'nt get all categories");
  }
};
