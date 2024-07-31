import { getCartProducts } from "@/actions/cart";
import { createPaymentIntent } from "@/actions/payment";
import { getCurrentUser } from "@/actions/users";
import CartProductCard from "@/components/CartProductCard";
import StripePayment from "@/components/StripePayment";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const page = async () => {
  const isLoggedIn = isUserLoggedIn();
  const cartProducts = isLoggedIn ? (await getCartProducts()).cartProducts : [];
  // redirect the user if he does'nt have a products in the cart
  if (!cartProducts.length) redirect("/shop");
  const currentUser = isLoggedIn ? await getCurrentUser() : null;
  const pricesArray = cartProducts.map(
    ({ product, quantity }) => product.price * quantity
  );
  const totalPrice: number = pricesArray.reduce((a, b) => a + b, 0)!;

  const paymentIntent = await createPaymentIntent(
    totalPrice * 100,
    `Payment For User ${currentUser?.username}`
  );
  return paymentIntent.client_secret && currentUser ? (
    <section className="md:p-10 p-5 min-h-screen bg-main-bg flex xl:flex-row flex-col-reverse xl:gap-10 gap-5">
      <div className="flex-1">
        {cartProducts?.length ? (
          <h2 className="font-bold capitalize text-4xl text-black-text md:text-start text-center">
            Total: <span className="text-button-1">${totalPrice}</span>
          </h2>
        ) : (
          ""
        )}
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10">
          {cartProducts?.map((cartProduct) => (
            <CartProductCard
              cartProduct={cartProduct}
              key={cartProduct.product.id}
            />
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
