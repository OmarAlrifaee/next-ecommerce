import { getCartProducts } from "@/actions/cart";
import { getAllCategories } from "@/actions/categories";
import { getAllProducts } from "@/actions/products";
import Card from "@/components/Card";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import SwiperComponent from "@/lib/SwiperComponent";
import { Metadata } from "next";

const Home = async () => {
  const { products } = await getAllProducts();
  const categories = await getAllCategories();
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  return (
    <section className="md:p-10 p-5">
      {products.length ? (
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
                  !!cartProducts.some((cartProduct) => {
                    return cartProduct?.product.id === product.id;
                  })
                }
                loggedIn={isLoggedIn}
              />
            ))}
          </SwiperComponent>
        </div>
      ) : (
        <Card>
          <p className="text-white capitalize font-bold">
            There Is No Products Avaliable
          </p>
        </Card>
      )}
      {categories.length ? (
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
      ) : (
        <Card>
          <p className="text-white capitalize font-bold">
            There Is No Categories Avaliable
          </p>
        </Card>
      )}
    </section>
  );
};
export default Home;
export const metadata: Metadata = {
  title: "home",
};
