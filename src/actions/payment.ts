"use server";

import Stripe from "stripe";

export const createPaymentIntent = async (
  amount: number,
  description: string
) => {
  try {
    // first i should make a new instence from stripe with my config
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
      apiVersion: "2024-04-10",
    });
    // now i should add the desc and the amount and the currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      description,
      currency: "USD",
    });
    return paymentIntent;
  } catch (error) {
    throw new Error("could'nt create a payment intenet");
  }
};