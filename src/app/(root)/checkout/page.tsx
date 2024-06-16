import { getCartProducts } from "@/actions/cart";
import { createPaymentIntent } from "@/actions/payment";
import { getCurrentUser } from "@/actions/users";
import CartProductCard from "@/components/CartProductCard";
import StripePayment from "@/components/StripePayment";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Metadata } from "next";

const page = async () => {
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  const currentUser = isLoggedIn ? await getCurrentUser() : null;
  const pricesArray = cartProducts.map((product) => product.price);
  const totalPrice: number = pricesArray.reduce((a, b) => a + b, 0)!;

  const paymentIntent = await createPaymentIntent(
    totalPrice * 100,
    `Payment For User ${currentUser?.username}`
  );
  return paymentIntent.client_secret && currentUser ? (
    <section className="p-10 min-h-screen bg-main-bg flex xl:flex-row flex-col-reverse xl:gap-10 gap-5">
      <div className="flex-1">
        {cartProducts?.length ? (
          <h2 className="font-bold capitalize text-4xl text-white">
            Total: <span className="text-green-500">${totalPrice}</span>
          </h2>
        ) : (
          ""
        )}
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10">
          {cartProducts?.map((product) => (
            <CartProductCard product={product} key={product.id} />
          ))}
        </ul>
      </div>
      <StripePayment clientSecret={paymentIntent.client_secret} />
    </section>
  ) : (
    ""
  );
};
export default page;
export const metadata: Metadata = {
  title: "Checkout",
};
