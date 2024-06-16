import { getCurrentUser } from "@/actions/users";
import { OrderModel } from "@/models/orders";
import { OrderType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // get the current user
    const currentUser = await getCurrentUser();
    // get data from request
    const { paymentId, total }: OrderType = await req.json();
    // save data to database
    const newOrder = new OrderModel({
      paymentId,
      total,
      userId: currentUser?.id,
      username: currentUser?.username,
    });
    await newOrder.save();
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
        status: 500,
      }
    );
  }
};
