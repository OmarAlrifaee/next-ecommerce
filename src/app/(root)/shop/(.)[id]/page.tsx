import { getCartProducts } from "@/actions/cart";
import { getOneProduct } from "@/actions/products";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import { ProductType } from "@/types";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};
const ProductDetails = async ({ params }: Props) => {
  const product = await getOneProduct(params.id);
  let cartProducts: ProductType[] | null = null;
  if (cookies().get("token")?.value) {
    cartProducts = (await getCartProducts()).cartProducts;
  }
  return (
    <section className="md:p-10 p-5">
      {product ? (
        <ProductDetailsCard
          product={product}
          inCart={
            !!cartProducts?.some((cartProduct) => {
              return cartProduct.id === product.id;
            })
          }
          notLoggedIn={!!cookies().get("token")?.value}
        />
      ) : (
        ""
      )}
    </section>
  );
};
export default ProductDetails;
