"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import AddNewLink from "./AddNewLink";
import Submit from "./Submit";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StripeForm = () => {
  const { replace } = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const hundleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      replace("/checkout/success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={hundleSubmit} className="flex flex-col gap-5">
      <PaymentElement />
      <div className="flex items-center xl:justify-normal justify-center gap-5">
        {!loading ? (
          <AddNewLink
            href="/cart"
            text="Cancel"
            style="bg-red-500 tranistion hover:bg-red-200"
          />
        ) : (
          ""
        )}
        <Submit
          text={loading ? "loading..." : "Pay"}
          style="bg-primary transition hover:bg-blue-200 text-white disabled:bg-blue-200"
          disabled={loading}
        />
      </div>
    </form>
  );
};
export default StripeForm;
