import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import AddProductForm from "./forms/AddProductForm";
import RemoveProductForm from "./forms/RemoveProductForm";
import { getCartProducts } from "@/actions/cart";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
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
    <Card shadow="md" className="w-[250px] bg-main-soft-bg min-h-[500px]">
      <CardHeader className="p-0">
        <div className="relative w-full h-[200px]">
          <Image
            src={product.img || "/noproduct.jpg"}
            alt={`${product.title} image`}
            fill
          />
        </div>
      </CardHeader>
      <CardBody>
        <article className="flex flex-col gap-2 text-navlink">
          <h3 className="text-xl font-bold text-white-text">{`${product.title.slice(
            0,
            30
          )}${product?.title?.length > 30 ? "..." : ""}`}</h3>
          {product?.color && product?.size ? (
            <div className="flex items-center justify-between">
              <div
                className={`size-5 rounded-full`}
                style={{ backgroundColor: product?.color }}
              />
              <p className="font-semibold capitalize">{product?.size}</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex items-center justify-between">
            <p className="font-semibold capitalize">${product.price}</p>
            <p className="font-semibold capitalize">{product.category}</p>
          </div>
          <div className="flex items-center justify-between">
            {quantity ? (
              <p className="font-semibold capitalize">
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
        <div className="flex flex-col gap-3 absolute bottom-0 left-0 w-full px-5 pb-5">
          <MyToolTip content="show product details">
            <AddNewLink
              text="Show"
              href={`/shop/${product.id}`}
              style="text-center text-navlink hover:text-primary"
            />
          </MyToolTip>
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
                style="text-white-text bg-primary font-bold border-none"
              />
            </MyToolTip>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
