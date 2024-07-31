import { getCartProducts } from "@/actions/cart";
import { getAllProducts, getOneProduct } from "@/actions/products";
import ProductCard from "@/components/ProductCard";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { ProductType } from "@/types";
import Link from "next/link";
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
  const productsObj = await getAllProducts("1", product?.category);
  const products = productsObj.products?.filter(
    (p) => p.title !== product?.title
  );
  return (
    <section className="md:p-10 p-5 min-h-screen">
      <div className="text-lg text-gray-text font-semibold md:text-start text-center capitalize w-full">
        <Link href={"/shop?page=1"}>shop</Link> /{" "}
        <Link href={`/shop?category=${product?.category}&page=1`}>
          {product?.category}
        </Link>
        <span className="text-black-text"> / {product?.title}</span>
      </div>
      {product ? (
        <ProductDetailsCard
          product={product}
          inCart={
            !!cartProducts.some((cartProduct) => {
              return cartProduct.product.id === product?.id;
            })
          }
          loggedIn={isLoggedIn}
        />
      ) : (
        ""
      )}
      {products.length ? (
        <div className="mt-5">
          <h3 className="text-black md:text-start text-center capitalize font-semibold text-3xl">
            More Related Products
          </h3>
          <ul className="grid xl:grid-cols-4 lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 place-items-center gap-x-2 gap-y-6 mt-10">
            {products.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                inCart={
                  !!cartProducts.some((cartProduct) => {
                    return cartProduct.product.id === relatedProduct?.id;
                  })
                }
                loggedIn={isLoggedIn}
              />
            ))}
          </ul>
        </div>
      ) : (
        <h3 className="mt-5 text-black md:text-start text-center capitalize font-semibold text-3xl">
          No Related Products
        </h3>
      )}
    </section>
  );
};
export default ProductDetails;
