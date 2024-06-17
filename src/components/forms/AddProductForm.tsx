"use client";

import { addToCart } from "@/actions/cart";
import Submit from "../Submit";
import toast from "react-hot-toast";
type Props = {
  productId: string;
  widthFull?: true;
};
const AddProductForm = ({ productId, widthFull }: Props) => {
  const addAction = async () => {
    const state = await addToCart(productId);
    if (state.success) toast.success("Added");
    else toast.error("Could'nt Add Product");
  };
  return (
    <form action={addAction} className={widthFull ? "w-full" : ""}>
      <Submit
        text="Add"
        style={`bg-primary text-white transition hover:bg-blue-200 ${
          widthFull ? "w-full" : ""
        }`}
      />
    </form>
  );
};
export default AddProductForm;