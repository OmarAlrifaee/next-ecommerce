"use server";
import itemPerPage from "@/helper/itemPerPage";
import { CartModel } from "@/models/cart";
import { connectToDB } from "@/models/connection";
import { ProductModel } from "@/models/products";
import { ProductType } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAllProducts = async (
  page: string = "1",
  category: string = "",
  search: string = ""
) => {
  try {
    connectToDB();
    const searchRegex = new RegExp(search, "i");
    const categoryRegex = new RegExp(category, "i");
    const productsCount: number = await ProductModel.find({
      title: { $regex: searchRegex },
      category: { $regex: categoryRegex },
    }).countDocuments();
    const products = await ProductModel.find<ProductType>({
      category: { $regex: categoryRegex },
      title: { $regex: searchRegex },
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
export const deleteProduct = async (id: string) => {
  try {
    connectToDB();
    await ProductModel.findByIdAndDelete(id);
    // here i should delete the product from all carts too
    await CartModel.updateMany(
      { "products.id": id },
      {
        $pull: { products: { id } },
      }
    );
  } catch (error) {
    throw new Error("could'nt delete a product");
  }
  revalidatePath("/dashboard/products");
};
export const addProduct = async (data: FormData) => {
  try {
    connectToDB();
    const productData = Object.fromEntries(data);
    const oldProduct = await ProductModel.findOne({ title: productData.title });
    if (oldProduct) throw new Error("product already exist");
    const newProduct = new ProductModel(productData);
    await newProduct.save();
  } catch (error) {
    throw new Error("could'nt add a new product");
  }
  redirect("/dashboard/products");
};
export const updateProduct = async (data: FormData, id: string) => {
  try {
    connectToDB();
    const productData = Object.fromEntries(data);
    // remove any key with an empty value or undifined
    // to prevent assign it to the database as an undifined faild
    console.log(productData.stock);
    Object.keys(productData).map(
      (key) =>
        (productData[key] === "" || productData[key] === undefined) &&
        delete productData[key]
    );
    await ProductModel.findByIdAndUpdate(id, productData);
  } catch (error) {
    throw new Error("could'nt update a product");
  }
  redirect("/dashboard/products");
};
