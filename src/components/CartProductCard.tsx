import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import RemoveProductForm from "./forms/RemoveProductForm";
import AddProductForm from "./forms/AddProductForm";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  cartProduct: { product: ProductType; quantity: number };
};
const CartProductCard = async ({ cartProduct }: Props) => {
  return (
    <Card
      shadow="md"
      className="relative capitalize w-full bg-main-soft-bg min-h-[600px]"
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-[200px]">
          <Image
            src={cartProduct.product.img || "/noproduct.jpg"}
            alt={`${cartProduct.product.title} image`}
            fill
          />
        </div>
      </CardHeader>
      <CardBody>
        <article className="flex flex-col gap-2 text-navlink">
          <h3 className="text-xl font-bold text-white-text">
            {cartProduct.product.title}
          </h3>
          {cartProduct.product?.color && cartProduct.product?.size ? (
            <div className="flex items-center justify-between">
              <div
                className={`size-5 rounded-full`}
                style={{ backgroundColor: cartProduct.product?.color }}
              />
              <p className="font-semibold capitalize">
                {cartProduct.product?.size}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="flex items-center justify-between">
            <p className="font-semibold capitalize">
              ${cartProduct.product.price}
            </p>
            <p className="font-semibold capitalize">
              {cartProduct.product.category}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {cartProduct.quantity ? (
              <p className="font-semibold capitalize">
                <span className="text-white-text">Quantity: </span>
                {cartProduct.quantity}
              </p>
            ) : (
              ""
            )}
            <p className="font-semibold capitalize">
              <span className="text-white-text">In Stock: </span>
              {cartProduct.product.stock}
            </p>
          </div>
        </article>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col gap-3 absolute bottom-0 left-0 w-full px-5 pb-5">
          <MyToolTip content="show product details">
            <AddNewLink
              text="Show"
              href={`/shop/${cartProduct.product.id}`}
              style="text-center text-navlink hover:text-primary"
            />
          </MyToolTip>
          <AddProductForm
            productId={cartProduct.product.id}
            quantity={cartProduct.quantity}
            stock={cartProduct.product.stock}
          />
          <RemoveProductForm productId={cartProduct.product.id} widthFull />
        </div>
      </CardFooter>
    </Card>
  );
};
export default CartProductCard;
