import { ProductType } from "@/types";
import Image from "next/image";
import Submit from "./Submit";
import { removeFromCart } from "@/actions/cart";
import AddNewLink from "./AddNewLink";
type Props = {
  product: ProductType;
};
const CartProductCard = async ({ product }: Props) => {
  return (
    <div className="relative capitalize w-full flex flex-col gap-3 bg-main-soft-bg rounded-md min-h-[600px]">
      <div className="relative w-full h-[30vh]">
        <Image
          src={product.img || "/noproduct.jpg"}
          alt={`${product.title} image`}
          fill
        />
      </div>
      <article className="px-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-white">{`${product.title.slice(
          0,
          30
        )}${product?.title?.length > 30 ? "..." : ""}`}</h3>
        <p className="text-soft-text font-semibold ">{`${product.desc.slice(
          0,
          70
        )}${product?.desc?.length > 70 ? "..." : ""}`}</p>
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
        <div className="flex flex-col gap-3 absolute bottom-0 left-0 w-full pb-5 px-5">
          <AddNewLink
            text="Show"
            href={`/shop/${product.id}`}
            style="text-center"
          />
          <form
            action={async () => {
              "use server";
              await removeFromCart(product.id);
            }}
            className="w-full"
          >
            <Submit
              text="Remove"
              style="bg-red-500 text-white w-full transition hover:bg-red-200"
            />
          </form>
        </div>
      </article>
    </div>
  );
};
export default CartProductCard;
