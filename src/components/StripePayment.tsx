"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
type Props = {
  clientSecret: any;
};
// stripe promise
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const StripePayment = ({ clientSecret }: Props) => {
  return (
    <div className="flex-1">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: clientSecret,
        }}
      >
        <StripeForm />
      </Elements>
    </div>
  );
};
export default StripePayment;
