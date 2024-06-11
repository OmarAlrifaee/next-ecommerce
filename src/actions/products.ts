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
    const products = await ProductModel.find<ProductType>({
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
export const getOneProduct = async (id: string) => {
  try {
    connectToDB();
    const product = await ProductModel.findById<ProductType>(id);
    return product;
  } catch (error) {
    throw new Error("could'nt get one product");
  }
};