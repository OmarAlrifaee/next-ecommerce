"use server";

import { CategoryModel } from "@/models/categories";
import { connectToDB } from "@/models/connection";
import { CategoryType } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAllCategories = async (search: string = "") => {
  try {
    connectToDB();
    const searchRegex = new RegExp(search, "i");
    const categories: CategoryType[] = await CategoryModel.find({
      title: { $regex: searchRegex },
    });
    return categories;
  } catch (error) {
    throw new Error("could'nt get all categories");
  }
};
export const getOneCategory = async (id: string) => {
  try {
    connectToDB();
    const category = await CategoryModel.findById<CategoryType>(id);
    return category;
  } catch (error) {
    throw new Error("could'nt get one category");
  }
};
export const deleteCategory = async (id: string) => {
  try {
    connectToDB();
    await CategoryModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("could'nt delete a Category");
  }
  revalidatePath("/dashboard/categories");
};
export const addCategory = async (data: FormData) => {
  try {
    connectToDB();
    const categoryData = Object.fromEntries(data);
    const oldCategory = await CategoryModel.findOne({
      title: categoryData.title,
    });
    if (oldCategory) throw new Error("category already exist");
    const newCategory = new CategoryModel(categoryData);
    await newCategory.save();
  } catch (error) {
    throw new Error("could'nt add a new category");
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
};
export const updateCategory = async (data: FormData, id: string) => {
  try {
    connectToDB();
    const categoryData = Object.fromEntries(data);
    // remove any key with an empty value or undifined
    // to prevent assign it to the database as an undifined faild
    Object.keys(categoryData).map(
      (key) =>
        (categoryData[key] === "" || categoryData[key] === undefined) &&
        delete categoryData[key]
    );
    await CategoryModel.findByIdAndUpdate(id, categoryData);
  } catch (error) {
    throw new Error("could'nt update a category");
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
};
