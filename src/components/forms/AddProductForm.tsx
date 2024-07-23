"use client";

import { addToCart } from "@/actions/cart";
import Submit from "../Submit";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Card from "../Card";
import { createPortal } from "react-dom";
import { Button } from "@nextui-org/react";
import MyToolTip from "../shared/MyToolTip";
type Props = {
  productId: string;
  widthFull?: boolean;
  quantity?: number;
  stock: number;
};
const AddProductForm = ({ productId, widthFull, quantity, stock }: Props) => {
  const [currentQuantity, setcurrentQuantity] = useState(quantity || 1);
  const [show, setShow] = useState(false);
  useEffect(() => {
    quantity && setcurrentQuantity(quantity);
  }, [show, quantity]);
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
            <MyToolTip content="decrement quantity">
              <Button
                isDisabled={currentQuantity <= 1}
                onClick={() => setcurrentQuantity((prev) => prev - 1)}
                className="text-3xl bg-red-500  text-white-text font-bold"
                type="button"
                radius="md"
                isIconOnly
              >
                -
              </Button>
            </MyToolTip>
            <input
              className="font-bold text-white-text bg-navlink size-10 rounded-md text-center"
              type="text"
              disabled
              value={currentQuantity}
            />
            <MyToolTip content="increment quantity">
              <Button
                isDisabled={currentQuantity >= stock}
                onClick={() => setcurrentQuantity((prev) => prev + 1)}
                type="button"
                className="text-3xl bg-primary text-white-text font-bold"
                radius="md"
                isIconOnly
              >
                +
              </Button>
            </MyToolTip>
          </div>
          <Submit
            text="Add"
            style={`text-white-text bg-primary font-bold w-full border-none`}
            tooltipContent="add to cart"
          />
          <MyToolTip content="close the popup">
            <Button
              onClick={() => setShow(false)}
              className="bg-red-500 mt-3 text-white-text  w-full  font-semibold"
              radius="md"
              variant="solid"
            >
              Close
            </Button>
          </MyToolTip>
        </form>
      </Card>,
      document.getElementById("popup")!
    )
  ) : (
    <MyToolTip content={quantity ? "edit the quantity" : "add to cart"}>
      <Button
        className={`text-white-text bg-primary font-bold ${
          widthFull ? "w-full" : ""
        }`}
        onClick={() => setShow(true)}
      >
        {quantity ? "Edit" : "Add"}
      </Button>
    </MyToolTip>
  );
};
export default AddProductForm;
