import { clearCart, getCartProducts } from "@/actions/cart";
import ProductCard from "@/components/ProductCard";
import Submit from "@/components/Submit";
import { ProductType } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

const Cart = async () => {
  let cartProducts: ProductType[] | null = null;
  if (cookies().get("token")?.value) {
    cartProducts = (await getCartProducts()).cartProducts;
  }
  return (
    <div>
      {cartProducts?.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          inCart={
            !!cartProducts?.some((cartProduct) => {
              return cartProduct.id === product.id;
            })
          }
          notLoggedIn={!!cookies().get("token")?.value}
        />
      ))}
      {cartProducts?.length ? (
        <form action={clearCart}>
          <Submit text="Clear Cart" style="bg-red-500" />
        </form>
      ) : (
        ""
      )}
    </div>
  );
};
export default Cart;
export const metadata: Metadata = {
  title: "cart",
};
