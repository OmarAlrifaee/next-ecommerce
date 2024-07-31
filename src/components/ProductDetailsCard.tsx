import { ProductType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import AddProductForm from "./forms/AddProductForm";
import RemoveProductForm from "./forms/RemoveProductForm";
import { getCartProducts } from "@/actions/cart";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import MyToolTip from "./shared/MyToolTip";
import ProductDetailsDescription from "./ProductDetailsDescription";
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
    <div className="md:flex md:items-center md:justify-between gap-10 mt-20">
      <div className="relative md:h-[450px] h-[350px] flex-1">
        <Image
          src={product.img || "/noproduct.jpg"}
          alt={`${product.title} photo`}
          fill
        />
      </div>
      <article className="flex-1 md:mt-0 mt-5">
        <h3 className="text-3xl text-black-text font-bold capitalize">
          {product?.title}
        </h3>
        <p className="text-2xl text-black-text font-semibold capitalize mt-3">
          ${product.price}
        </p>
        {product.size && product.color ? (
          <div className="mt-3 flex items-center justify-between">
            <div
              className="size-10 rounded-full"
              style={{ backgroundColor: product.color || "black" }}
            />

            <p className="text-black-text text-medium capitalize font-semibold">
              {product.size}
            </p>
          </div>
        ) : (
          ""
        )}
        <ProductDetailsDescription desc={product.desc} />
        {productInCart?.product ? (
          <div className="flex items-center justify-between mt-3">
            <p className="text-black-text text-lg capitalize font-semibold">
              Quantity:{" "}
              <span className="text-button-2 text-medium">{quantity}</span>
            </p>
            <p className="text-black-text text-lg capitalize font-semibold">
              Stock:{" "}
              <span className="text-button-1 text-medium">{product.stock}</span>
            </p>
          </div>
        ) : (
          ""
        )}
        {loggedIn ? (
          <>
            <div className="flex items-center justify-between mt-5">
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
              style="text-white-text bg-button-3 font-bold border-none mt-5 w-full"
            />
          </MyToolTip>
        )}
        <div className="h-[1px] w-full bg-gray-text mt-5" />
      </article>
    </div>
  );
};
export default ProductDetailsCard;
