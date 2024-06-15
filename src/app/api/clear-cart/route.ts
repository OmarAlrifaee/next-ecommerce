import { clearCart } from "@/actions/cart";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  try {
    await clearCart();
    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      }
    );
  }
};
