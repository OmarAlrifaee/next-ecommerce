import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import Submit from "./Submit";
import { addToCart, removeFromCart } from "@/actions/cart";
type Props = {
  product: ProductType;
  inCart: boolean;
  notLoggedIn: boolean;
};
const ProductDetailsInterceptedCard = async ({
  product,
  inCart,
  notLoggedIn,
}: Props) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80)] bg-transparent">
      <div className="relative capitalize md:w-1/2 w-full flex flex-col gap-3 bg-main-soft-bg pb-5 rounded-md overflow-hidden">
        <div className="relative w-full h-[30vh]">
          <Image
            src={product.img || "/noproduct.jpg"}
            alt={`${product.title} image`}
            fill
          />
        </div>
        <article className="px-5 flex flex-col gap-3">
          <h3 className="text-xl font-bold text-white">{product.title}</h3>
          <p className="text-soft-text font-semibold ">{product.desc}</p>
          {product?.color && product?.size ? (
            <div className="flex items-center justify-between">
              <div
                className={`size-5 rounded-full`}
                style={{ backgroundColor: product?.color }}
              />
              <p className="text-soft-text font-semibold capitalize">
                {product?.size}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold capitalize">
              ${product.price}
            </p>
            <p className="text-white font-semibold capitalize">
              {product.category}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {notLoggedIn ? (
              inCart ? (
                <form
                  action={async () => {
                    "use server";
                    await removeFromCart(product.id);
                  }}
                  className="w-full"
                >
                  <Submit text="Remove" style="bg-red-500 text-white w-full" />
                </form>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    await addToCart(product.id);
                  }}
                  className="w-full"
                >
                  <Submit text="Add" style="bg-primary text-white w-full" />
                </form>
              )
            ) : (
              <AddNewLink
                text="Login"
                href="/login"
                style="w-full text-center"
              />
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
export default ProductDetailsInterceptedCard;
