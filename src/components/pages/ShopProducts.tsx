import { getCartProducts } from "@/actions/cart";
import { getAllProducts } from "@/actions/products";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Card } from "@nextui-org/react";
import Pagenation from "../Pagenation";
import ProductCard from "../ProductCard";

type Props = {
  searchParams: {
    category: string;
    search: string;
    page: string;
  };
};
const ShopProducts = async ({ searchParams }: Props) => {
  const { products, productsCount } = await getAllProducts(
    searchParams?.page,
    searchParams?.category,
    searchParams?.search
  );
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  return products.length ? (
    <>
      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 place-items-center gap-x-2 gap-y-6 mt-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            inCart={
              !!cartProducts?.some((cartProduct) => {
                return cartProduct.product.id === product.id;
              })
            }
            loggedIn={isLoggedIn}
          />
        ))}
      </ul>
      <Pagenation count={productsCount} />
    </>
  ) : (
    <Card>
      <p className="text-black-text capitalize font-bold">
        There Is No Products Avaliable
      </p>
    </Card>
  );
};

export default ShopProducts;
