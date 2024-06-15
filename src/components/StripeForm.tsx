"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import AddNewLink from "./AddNewLink";
import Submit from "./Submit";
import { useRouter } from "next/navigation";

const StripeForm = () => {
  const { replace } = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const hundleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!elements || !stripe) return;
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (result.error) {
        console.log(result.error.message);
      }
      // clear the cart data
      await fetch("/api/clear-cart", { method: "DELETE" });
      replace("/cart");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={hundleSubmit} className="flex flex-col gap-5 text-white">
      <PaymentElement />
      <div className="flex items-center gap-5">
        <AddNewLink
          href="/cart"
          text="Cancel"
          style="bg-red-500 tranistion hover:bg-red-200"
        />
        <Submit
          text="Pay"
          style="bg-primary transition hover:bg-blue-200 text-white"
        />
      </div>
    </form>
  );
};
export default StripeForm;
