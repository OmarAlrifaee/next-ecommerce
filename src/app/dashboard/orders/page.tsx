import { getAllOrders } from "@/actions/order";
import OrderRow from "@/components/OrderRow";
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
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold text-black-text">
            <tr>
              <td className="p-3">UserName</td>
              <td>Total</td>
              <td>Created At</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.reverse().map((order) => (
              <OrderRow order={order} key={order.id} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default Orders;
export const metadata: Metadata = {
  title: "Orders",
};
