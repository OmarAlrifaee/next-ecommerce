import { getCartProducts } from "@/actions/cart";
import Card from "@/components/Card";
import CartProductCard from "@/components/CartProductCard";
import ClearCartForm from "@/components/forms/ClearCartForm";
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
            <h2 className="font-bold capitalize text-4xl text-black">
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
            <Link
              className="bg-green-500 text-center text-white w-full transition hover:bg-green-200 border-none rounded-md  px-4 py-2 font-semibold"
              href="/checkout"
            >
              Check Out
            </Link>
            <ClearCartForm widthFull />
          </div>
        </>
      ) : (
        <Card>
          <p className="text-black capitalize font-bold">
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
