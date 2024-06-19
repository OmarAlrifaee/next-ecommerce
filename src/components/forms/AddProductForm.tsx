"use client";

import { addToCart } from "@/actions/cart";
import Submit from "../Submit";
import toast from "react-hot-toast";
import { useState } from "react";
import Card from "../Card";
import { createPortal } from "react-dom";
import { FaCircleXmark } from "react-icons/fa6";
type Props = {
  productId: string;
  widthFull?: boolean;
  quantity?: number;
  stock: number;
};
const AddProductForm = ({ productId, widthFull, quantity, stock }: Props) => {
  const [currentQuantity, setcurrentQuantity] = useState(quantity || 1);
  const [show, setShow] = useState(false);
  const addAction = async () => {
    const state = await addToCart(productId, currentQuantity);
    if (state.success) {
      toast.success("Added");
      setShow(false);
    } else toast.error("Could'nt Add Product");
  };
  return show ? (
    createPortal(
      <Card fixed>
        <form action={addAction} className={widthFull ? "w-full" : ""}>
          <div className="flex items-center gap-5 justify-center p-5">
            <button
              disabled={currentQuantity <= 1}
              onClick={() => setcurrentQuantity((prev) => prev - 1)}
              type="button"
              className="text-3xl bg-red-500 rounded-md transition hover:bg-red-200 disabled:bg-red-200 text-white font-bold size-10 flex items-center justify-center"
            >
              -
            </button>
            <span className="font-bold text-white">{quantity}</span>
            <button
              disabled={currentQuantity >= stock}
              onClick={() => setcurrentQuantity((prev) => prev + 1)}
              type="button"
              className="text-3xl bg-primary rounded-md transition hover:bg-blue-200 disabled:bg-blue-200 text-white font-bold size-10 flex items-center justify-center"
            >
              +
            </button>
          </div>
          <Submit
            text="Add"
            style={`bg-primary text-white transition hover:bg-blue-200 w-full`}
          />
          <button
            onClick={() => setShow(false)}
            className="bg-red-500 mt-3 text-white transition hover:bg-red-200 w-full border-none rounded-md px-4 py-2 font-semibold"
          >
            Close
          </button>
        </form>
      </Card>,
      document.getElementById("popup")!
    )
  ) : (
    <button
      className={`bg-primary text-white transition hover:bg-blue-200 ${
        widthFull ? "w-full" : ""
      } border-none rounded-md transition px-4 py-2 font-semibold`}
      onClick={() => setShow(true)}
    >
      {quantity ? "Edit" : "Add"}
    </button>
  );
};
export default AddProductForm;
