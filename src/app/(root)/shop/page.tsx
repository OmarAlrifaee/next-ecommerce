import { getCartProducts } from "@/actions/cart";
import { getAllProducts } from "@/actions/products";
import Catergories from "@/components/Catergories";
import Pagenation from "@/components/Pagenation";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
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
  const { cartProducts } = await getCartProducts();
  return (
    <section>
      <div className="flex items-center justify-center gap-5">
        <Catergories />
        <Search />
      </div>
      {/* products here */}
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          inCart={cartProducts.some((cartProduct) => {
            return cartProduct.id === product.id;
          })}
        />
      ))}
      <Pagenation count={productsCount} />
    </section>
  );
};
export default Shop;
export const metadata: Metadata = {
  title: "shop",
};
