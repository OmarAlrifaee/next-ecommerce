import { getCartProducts } from "@/actions/cart";
import { getOneProduct } from "@/actions/products";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { ProductType } from "@/types";

type Props = {
  params: { id: string };
};
export const generateMetadata = async ({ params }: Props) => {
  const product = (await getOneProduct(params.id)) as ProductType;
  return {
    title: `${product.title} product`,
  };
};
const ProductDetails = async ({ params }: Props) => {
  const product = await getOneProduct(params.id);
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  return (
    <section className="md:p-10 p-5">
      {product ? (
        <ProductDetailsCard
          product={product}
          inCart={
            !!cartProducts.some((cartProduct) => {
              return cartProduct.id === product.id;
            })
          }
          loggedIn={isLoggedIn}
        />
      ) : (
        ""
      )}
    </section>
  );
};
export default ProductDetails;
