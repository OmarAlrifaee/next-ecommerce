import { getCartProducts } from "@/actions/cart";
import { getAllCategories } from "@/actions/categories";
import { getAllProducts } from "@/actions/products";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { CartType, ProductType } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
const Home = async () => {
  const { products } = await getAllProducts();
  const categories = await getAllCategories();
  let cartProducts: ProductType[] | null = null;
  if (cookies().get("token")?.value) {
    cartProducts = (await getCartProducts()).cartProducts;
  }
  return (
    <section>
      Home
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          inCart={
            !!cartProducts?.some((cartProduct) => {
              return cartProduct.id === product.id;
            })
          }
          notLoggedIn={!!cookies().get("token")?.value}
        />
      ))}
      {categories.map((cat) => (
        <CategoryCard category={cat} key={cat.id} />
      ))}
    </section>
  );
};
export default Home;
export const metadata: Metadata = {
  title: "home",
};
