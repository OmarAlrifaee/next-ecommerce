import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import AddProductForm from "./forms/AddProductForm";
import RemoveProductForm from "./forms/RemoveProductForm";
import { getCartProducts } from "@/actions/cart";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";

type Props = {
  product: ProductType;
  inCart: boolean;
  loggedIn: boolean;
};
const ProductDetailsCard = async ({ product, inCart, loggedIn }: Props) => {
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  const productInCart = cartProducts.find(
    (cartProduct) => cartProduct?.product.id === product.id
  );
  const quantity = productInCart?.quantity;
  return (
    <Card
      shadow="md"
      className="relative capitalize md:w-1/2 w-full flex flex-col gap-3 bg-main-soft-bg pb-5 rounded-md overflow-hidden"
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-[50vh]">
          <Image
            src={product.img || "/noproduct.jpg"}
            alt={`${product.title} image`}
            fill
          />
        </div>
      </CardHeader>
      <CardBody className="text-navlink">
        <article className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-white-text">{product.title}</h3>
          <p className="font-semibold text-white-text">{product.desc}</p>
          {product?.color && product?.size ? (
            <div className="flex items-center justify-between">
              <div
                className={`size-5 rounded-full`}
                style={{ backgroundColor: product?.color }}
              />
              <p className=" font-semibold capitalize">{product?.size}</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex items-center justify-between">
            <p className=" font-semibold capitalize">${product.price}</p>
            <p className=" font-semibold capitalize">{product.category}</p>
          </div>
          <div className="flex items-center justify-between">
            {quantity ? (
              <p className=" font-semibold capitalize">
                <span className="text-white-text">Quantity: </span>
                {quantity}
              </p>
            ) : (
              ""
            )}
            <p className="font-semibold capitalize">
              <span className="text-white-text">In Stock: </span>
              {product.stock}
            </p>
          </div>
        </article>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col gap-3 px-3 w-full">
          {loggedIn ? (
            <>
              {inCart ? (
                <RemoveProductForm productId={product.id} widthFull />
              ) : (
                ""
              )}
              <AddProductForm
                productId={product.id}
                widthFull
                stock={product.stock}
                quantity={quantity}
              />
            </>
          ) : (
            <MyToolTip content="go to login page">
              <AddNewLink
                text="Login"
                href="/login"
                style="text-white-text bg-primary font-bold border-none"
              />
            </MyToolTip>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductDetailsCard;
