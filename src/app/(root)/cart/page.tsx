import { clearCart, getCartProducts } from "@/actions/cart";
import AddNewLink from "@/components/AddNewLink";
import CartProductCard from "@/components/CartProductCard";
import ProductCard from "@/components/ProductCard";
import Submit from "@/components/Submit";
import { ProductType } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

const Cart = async () => {
  let cartProducts: ProductType[] | null = null;
  if (cookies().get("token")?.value) {
    cartProducts = (await getCartProducts()).cartProducts;
  }
  const pricesArray = cartProducts?.map((product) => product.price);
  const totalPrice = pricesArray?.reduce((a, b) => a + b, 0);
  return (
    <section className="md:p-10 p-5">
      {cartProducts?.length ? (
        <h2 className="font-bold capitalize text-4xl text-white">
          Total: <span className="text-green-500">${totalPrice}</span>
        </h2>
      ) : (
        ""
      )}
      <ul className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 justify-center items-center gap-5">
        {cartProducts?.map((product) => (
          <CartProductCard product={product} key={product.id} />
        ))}
      </ul>
      {cartProducts?.length ? (
        <div className="flex flex-col gap-3 mt-10">
          <Link
            className="bg-green-500 text-center text-white w-full transition hover:bg-green-200 border-none rounded-md  px-4 py-2 font-semibold"
            href="/checkout"
          >
            Check Out
          </Link>
          <form action={clearCart}>
            <Submit
              text="Clear Cart"
              style="bg-red-500 text-white w-full transition hover:bg-red-200"
            />
          </form>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
export default Cart;
export const metadata: Metadata = {
  title: "cart",
};
