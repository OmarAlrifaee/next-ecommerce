import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import RemoveProductForm from "./forms/RemoveProductForm";
import AddProductForm from "./forms/AddProductForm";
type Props = {
  cartProduct: { product: ProductType; quantity: number };
};
const CartProductCard = async ({ cartProduct }: Props) => {
  return (
    <div className="relative capitalize w-full flex flex-col gap-3 bg-main-soft-bg rounded-md min-h-[600px]">
      <div className="relative w-full h-[30vh]">
        <Image
          src={cartProduct.product.img || "/noproduct.jpg"}
          alt={`${cartProduct.product.title} image`}
          fill
        />
      </div>
      <article className="px-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-white">{`${cartProduct.product.title.slice(
          0,
          30
        )}${cartProduct.product?.title?.length > 30 ? "..." : ""}`}</h3>
        <p className="text-soft-text font-semibold ">{`${cartProduct.product.desc.slice(
          0,
          70
        )}${cartProduct.product?.desc?.length > 70 ? "..." : ""}`}</p>
        {cartProduct.product?.color && cartProduct.product?.size ? (
          <div className="flex items-center justify-between">
            <div
              className={`size-5 rounded-full`}
              style={{ backgroundColor: cartProduct.product?.color }}
            />
            <p className="text-soft-text font-semibold capitalize">
              {cartProduct.product?.size}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold capitalize">
            ${cartProduct.product.price}
          </p>
          <p className="text-white font-semibold capitalize">
            {cartProduct.product.category}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold capitalize">
            Quantity: {cartProduct.quantity}
          </p>
          <p className="text-white font-semibold capitalize">
            In Stock: {cartProduct.product.stock}
          </p>
        </div>
        <div className="flex flex-col gap-3 absolute bottom-0 left-0 w-full pb-5 px-5">
          <AddNewLink
            text="Show"
            href={`/shop/${cartProduct.product.id}`}
            style="text-center"
          />
          <AddProductForm
            productId={cartProduct.product.id}
            widthFull
            stock={cartProduct.product.stock}
            quantity={cartProduct.quantity}
          />
          <RemoveProductForm productId={cartProduct.product.id} widthFull />
        </div>
      </article>
    </div>
  );
};
export default CartProductCard;
