"use client";

import { removeFromCart } from "@/actions/cart";
import Submit from "../Submit";
import toast from "react-hot-toast";
type Props = {
  productId: string;
  widthFull?: true;
};
const RemoveProductForm = ({ productId, widthFull }: Props) => {
  const removeAction = async () => {
    const state = await removeFromCart(productId);
    if (state.success) toast.success("Removed");
    else toast.error("Could'nt Remove Product");
  };
  return (
    <form action={removeAction} className={widthFull ? "w-full" : ""}>
      <Submit
        text="Remove"
        style={`bg-red-500 text-white transition hover:bg-red-200 ${
          widthFull ? "w-full" : ""
        }`}
      />
    </form>
  );
};
export default RemoveProductForm;
