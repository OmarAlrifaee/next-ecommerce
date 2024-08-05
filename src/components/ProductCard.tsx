import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import AddProductForm from "./forms/AddProductForm";
import RemoveProductForm from "./forms/RemoveProductForm";
import { getCartProducts } from "@/actions/cart";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
type Props = {
  product: ProductType;
  inCart: boolean;
  loggedIn: boolean;
};
const ProductCard = async ({ product, inCart, loggedIn }: Props) => {
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  const productInCart = cartProducts.find(
    (cartProduct) => cartProduct?.product.id === product.id
  );
  const quantity = productInCart?.quantity;
  return (
    <Card shadow="sm" className="md:w-[300px] w-full min-h-[300px] bg-main-bg">
      <CardHeader>
        <div className="relative group w-full h-[200px] bg-main-soft-bg overflow-hidden">
          <Image
            src={product.img || "/noproduct.jpg"}
            alt={`${product.title} image`}
            fill
            className="transition group-hover:blur-sm"
          />
          <MyToolTip content={`show ${product.title} details`}>
            <Link
              href={`/shop/${product.id}`}
              className="absolute group-hover:flex items-center justify-center w-full h-full left-0 top-0 z-10 hidden"
            >
              <div className="p-2 bg-white-text rounded-full shadow-sm">
                <IoEyeSharp className="text-4xl" />
              </div>
            </Link>
          </MyToolTip>
        </div>
      </CardHeader>
      <CardBody>
        <h3 className="text-lg font-semibold text-black-text capitalize ">{`${product.title.slice(
          0,
          20
        )}${product?.title?.length > 20 ? "..." : ""}`}</h3>
        <div className="flex items-center justify-between mt-3">
          <p className="font-semibold capitalize text-button-2 text-medium">
            ${product.price}
          </p>
          <p className="font-semibold capitalize text-medium">
            {product.category}
          </p>
        </div>
      </CardBody>
      <CardFooter className="block">
        {loggedIn ? (
          <>
            <div className="flex items-center justify-between">
              {inCart ? <RemoveProductForm productId={product.id} /> : ""}
              <AddProductForm
                productId={product.id}
                quantity={quantity}
                stock={product.stock}
                widthFull={!inCart}
              />
            </div>
          </>
        ) : (
          <MyToolTip content="go to login page">
            <AddNewLink
              text="Login"
              href="/login"
              style="text-white-text bg-button-3 font-bold border-none w-full"
            />
          </MyToolTip>
        )}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
