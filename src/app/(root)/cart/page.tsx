import { clearCart, getCartProducts } from "@/actions/cart";
import ProductCard from "@/components/ProductCard";
import Submit from "@/components/Submit";
import { Metadata } from "next";

const Cart = async () => {
  const { cartProducts, count } = await getCartProducts();
  return (
    <div>
      {cartProducts.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          inCart={cartProducts.some((cartProduct) => {
            return cartProduct.id === product.id;
          })}
        />
      ))}
      {cartProducts.length ? (
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
