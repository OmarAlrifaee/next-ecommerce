import { getCartProducts } from "@/actions/cart";
import { getAllProducts } from "@/actions/products";
import Card from "@/components/Card";
import Catergories from "@/components/Catergories";
import Pagenation from "@/components/Pagenation";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Metadata } from "next";

type Props = {
  searchParams: {
    category: string;
    search: string;
    page: string;
  };
};
const Shop = async ({ searchParams }: Props) => {
  const { products, productsCount } = await getAllProducts(
    searchParams?.page,
    searchParams?.category,
    searchParams?.search
  );
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  return (
    <section className="md:p-10 p-5">
      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-center gap-5 ">
        <Catergories style="sm:w-fit w-full " />
        <Search style="sm:w-fit w-full " />
      </div>
      {products.length ? (
        <>
          <ul className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center w-full gap-x-2 gap-y-6 mt-10">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  inCart={
                    !!cartProducts?.some((cartProduct) => {
                      return cartProduct.product.id === product.id;
                    })
                  }
                  loggedIn={isLoggedIn}
                />
              </li>
            ))}
          </ul>
          <Pagenation count={productsCount} />
        </>
      ) : (
        <Card>
          <p className="text-black capitalize font-bold">
            There Is No Products Avaliable
          </p>
        </Card>
      )}
    </section>
  );
};
export default Shop;
export const metadata: Metadata = {
  title: "shop",
};
