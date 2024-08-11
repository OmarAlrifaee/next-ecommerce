import { getAllOrders } from "@/actions/order";
import OrdersTable from "@/components/pages/OrdersTable";
import Search from "@/components/Search";
import { Metadata } from "next";

type Props = {
  searchParams: {
    search: string;
  };
};
const Orders = async ({ searchParams }: Props) => {
  const orders = await getAllOrders(searchParams.search);
  const totalPriceArr = orders?.map((order) => order.total);
  const totalPrice = totalPriceArr?.reduce((a, b) => a + b, 0);
  return (
    <section className="bg-main-bg rounded-md border-1">
      <div className="p-5 mt-3 flex md:items-center md:justify-between md:flex-row flex-col-reverse gap-3">
        <Search />
        <h3 className="font-bold capitalize text-black-text">
          Total:{" "}
          <span className="text-button-1 font-semibold">${totalPrice}</span>
        </h3>
      </div>
      <OrdersTable searchParams={searchParams} />
    </section>
  );
};
export default Orders;
export const metadata: Metadata = {
  title: "Orders",
};
