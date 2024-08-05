import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import RemoveProductForm from "./forms/RemoveProductForm";
import AddProductForm from "./forms/AddProductForm";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
import { IoEyeSharp } from "react-icons/io5";
type Props = {
  cartProduct: { product: ProductType; quantity: number };
};
const CartProductCard = async ({ cartProduct }: Props) => {
  return (
    <Card shadow="sm" className="md:w-[300px] w-full min-h-[300px] bg-main-bg">
      <CardHeader>
        <div className="relative group w-full h-[200px] bg-main-soft-bg overflow-hidden">
          <Image
            src={cartProduct.product.img || "/noproduct.jpg"}
            alt={`${cartProduct.product.title} image`}
            fill
            className="transition group-hover:blur-sm"
          />
          <MyToolTip content={`show ${cartProduct.product.title} details`}>
            <Link
              href={`/shop/${cartProduct.product.id}`}
              className="absolute group-hover:flex items-center justify-center w-full h-full left-0 top-0 z-10 hidden"
            >
              <div className="p-2 bg-white-text rounded-full shadow-sm">
                <IoEyeSharp className="text-4xl text-black-text" />
              </div>
            </Link>
          </MyToolTip>
        </div>
      </CardHeader>
      <CardBody>
        <h3 className="text-lg font-semibold text-black-text capitalize">{`${cartProduct.product.title.slice(
          0,
          20
        )}${cartProduct.product?.title?.length > 20 ? "..." : ""}`}</h3>
        <div className="flex items-center justify-between mt-3">
          <p className="font-semibold capitalize text-button-2 text-medium">
            ${cartProduct.product.price}
          </p>
          <p className="font-semibold capitalize text-medium">
            {cartProduct.product.category}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="font-semibold capitalize text-black-text text-medium">
            quantity:{" "}
            <span className="text-button-2">{cartProduct.quantity}</span>
          </p>
          <p className="font-semibold capitalize text-medium text-black-text">
            Stock:{" "}
            <span className="text-button-1">{cartProduct.product.stock}</span>
          </p>
        </div>
      </CardBody>
      <CardFooter className="block">
        <div className="flex items-center justify-between">
          <RemoveProductForm productId={cartProduct.product.id} />
          <AddProductForm
            productId={cartProduct.product.id}
            quantity={cartProduct.quantity}
            stock={cartProduct.product.stock}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
export default CartProductCard;
