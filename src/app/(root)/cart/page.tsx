import { getCartProducts } from "@/actions/cart";
import AddNewLink from "@/components/AddNewLink";
import Card from "@/components/Card";
import CartProductCard from "@/components/CartProductCard";
import ClearCartForm from "@/components/forms/ClearCartForm";
import MyToolTip from "@/components/shared/MyToolTip";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Metadata } from "next";
import Link from "next/link";

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
          <Card>
            <h2 className="font-bold capitalize text-4xl text-white-text">
              Total: <span className="text-green-500">${totalPrice}</span>
            </h2>
          </Card>
          <ul className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 justify-center items-center gap-5">
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
                style="bg-green-500 text-white-text w-full border-none"
                text="Check Out"
              />
            </MyToolTip>
            <ClearCartForm widthFull />
          </div>
        </>
      ) : (
        <Card>
          <p className="text-white-text capitalize font-bold">
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
