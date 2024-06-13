import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import Submit from "./Submit";
import { addToCart } from "@/actions/cart";
type Props = {
  product: ProductType;
};
const ProductCard = ({ product }: Props) => {
  return (
    <div className="rounded-md shadow-md overflow-hidden capitalize w-[250px] flex flex-col gap-3 pb-5 bg-main-soft-bg">
      <div className="relative w-full h-[200px]">
        <Image
          src={product.img || "/noproduct.jpg"}
          alt={`${product.title} image`}
          fill
        />
      </div>
      <article className="px-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-white">{product.title}</h3>
        <p className="text-soft-text font-semibold ">
          {`${product.desc.slice(0, 30)}${
            product?.desc?.length > 30 ? "..." : ""
          }`}
        </p>
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
          <AddNewLink text="Show" href={`/shop/${product.id}`} />
          {
            // here i should make a add or delete buttons
            <form
              action={async () => {
                "use server";
                await addToCart(product.id);
              }}
            >
              <Submit text="Add" style="bg-primary text-white" />
            </form>
          }
        </div>
      </article>
    </div>
  );
};
export default ProductCard;
