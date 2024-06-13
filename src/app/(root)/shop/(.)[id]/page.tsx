import { getCartProducts } from "@/actions/cart";
import { getOneProduct } from "@/actions/products";
import ProductCard from "@/components/ProductCard";
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
  return product ? (
    <ProductCard
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
  );
};
export default ProductDetails;
