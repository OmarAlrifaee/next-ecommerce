import { getCartProducts } from "@/actions/cart";
import AddNewLink from "@/components/AddNewLink";
import Card from "@/components/Card";
import CartProductCard from "@/components/CartProductCard";
import ClearCartForm from "@/components/forms/ClearCartForm";
import MyToolTip from "@/components/shared/MyToolTip";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Metadata } from "next";

const Cart = async () => {
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  const pricesArray = cartProducts?.map(
    ({ product, quantity }) => product.price * quantity
  );
  const totalPrice = pricesArray.reduce((a, b) => a + b, 0);
  return (
    <section className="md:p-10 p-5">
      {cartProducts.length ? (
        <>
          <h3 className="font-bold capitalize text-4xl text-black-text md:text-start text-center">
            Total: <span className="text-button-1">${totalPrice}</span>
          </h3>
          <ul className="grid xl:grid-cols-4 lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 place-items-center gap-x-2 gap-y-6 mt-10">
            {cartProducts?.map((cartProduct) => (
              <CartProductCard
                cartProduct={cartProduct}
                key={cartProduct.product.id}
              />
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-10">
            <MyToolTip content="go to buy all your cart products">
              <AddNewLink
                href="/checkout"
                style="bg-button-1 text-white-text w-full border-none font-bold"
                text="Check Out"
              />
            </MyToolTip>
            <ClearCartForm widthFull />
          </div>
        </>
      ) : (
        <Card>
          <p className="text-black-text capitalize font-bold">
            There Is No Products Avaliable In Your Cart
          </p>
        </Card>
      )}
    </section>
  );
};
export default Cart;
export const metadata: Metadata = {
  title: "cart",
};
