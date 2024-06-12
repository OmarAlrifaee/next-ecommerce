import { getAllCategories } from "@/actions/categories";
import { getAllProducts } from "@/actions/products";
import { Metadata } from "next";

const Home = async () => {
  const { products } = await getAllProducts();
  const categories = await getAllCategories();
  return <div>Home</div>;
};
export default Home;
export const metadata: Metadata = {
  title: "home",
};
