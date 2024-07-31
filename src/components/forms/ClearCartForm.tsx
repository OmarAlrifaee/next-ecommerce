"use client";

import { clearCart } from "@/actions/cart";
import Submit from "../Submit";
import toast from "react-hot-toast";
type Props = {
  widthFull?: true;
};
const ClearCartForm = ({ widthFull }: Props) => {
  const clearAction = async () => {
    const state = await clearCart();
    if (state.success) toast.success("Cleared");
    else toast.error("Could'nt Clear The Cart");
  };
  return (
    <form action={clearAction} className={widthFull ? "w-full" : ""}>
      <Submit
        text="Clear Cart"
        style={`bg-button-2 hover:bg-button-2-hover text-white-text border-none font-bold ${
          widthFull ? "w-full" : ""
        }`}
        tooltipContent="clear all products from cart"
      />
    </form>
  );
};
export default ClearCartForm;
