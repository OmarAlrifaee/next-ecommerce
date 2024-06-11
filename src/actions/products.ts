"use server";
import itemPerPage from "@/helper/itemPerPage";
import { connectToDB } from "@/models/connection";
import { ProductModel } from "@/models/products";
import { ProductType } from "@/types";
export const getAllProducts = async (
  page: string = "1",
  category: string = "",
  search: string = ""
) => {
  try {
    connectToDB();
    const regex = new RegExp(search, "i");
    const productsCount: number = await ProductModel.find({
      title: { $regex: regex },
    }).countDocuments();
    const products: ProductType[] = await ProductModel.find({
      category,
      title: { $regex: regex },
    })
      .limit(itemPerPage)
      .skip(itemPerPage * (parseInt(page) - 1));
    return { products, productsCount };
  } catch (error) {
    throw new Error("could'nt get all products");
  }
};
