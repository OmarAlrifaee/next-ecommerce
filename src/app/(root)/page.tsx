import { getAllCategories } from "@/actions/categories";
import { getAllProducts } from "@/actions/products";

const Home = async () => {
  const { products } = await getAllProducts();
  const categories = await getAllCategories();
  return <div>Home</div>;
};
export default Home;
