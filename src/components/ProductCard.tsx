import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import AddProductForm from "./forms/AddProductForm";
import RemoveProductForm from "./forms/RemoveProductForm";
type Props = {
  product: ProductType;
  inCart: boolean;
  loggedIn: boolean;
};
const ProductCard = async ({ product, inCart, loggedIn }: Props) => {
  return (
    <div className="relative rounded-md shadow-md overflow-hidden capitalize min-h-[500px] w-[250px] flex flex-col gap-3 bg-main-soft-bg">
      <div className="relative w-full h-[200px]">
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
        <div className="flex items-center justify-between absolute bottom-0 left-0 w-full px-5 pb-5">
          <AddNewLink text="Show" href={`/shop/${product.id}`} />
          {loggedIn ? (
            inCart ? (
              <RemoveProductForm productId={product.id} />
            ) : (
              <AddProductForm productId={product.id} />
            )
          ) : (
            <AddNewLink text="Login" href="/login" />
          )}
        </div>
      </article>
    </div>
  );
};
export default ProductCard;
