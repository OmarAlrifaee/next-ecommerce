import { getCartProducts } from "@/actions/cart";
import { getAllCategories } from "@/actions/categories";
import { getAllProducts } from "@/actions/products";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SwiperComponent from "@/lib/SwiperComponent";
import { ProductType } from "@/types";
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
    <section className="md:p-10 p-5">
      <div className="mt-10">
        <h3 className="text-4xl italic font-bold text-white capitalize text-center mb-10">
          Our Best Products
        </h3>
        <SwiperComponent>
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
        </SwiperComponent>
      </div>
      <div className="mt-10">
        <h3 className="text-4xl italic font-bold text-white capitalize text-center mb-10">
          All Categories
        </h3>
        <SwiperComponent>
          {categories.map((cat) => (
            <CategoryCard category={cat} key={cat.id} />
          ))}
        </SwiperComponent>
      </div>
    </section>
  );
};
export default Home;
export const metadata: Metadata = {
  title: "home",
};
