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
    <section className="bg-main-soft-bg mt-5">
      <div className="p-5 mt-3 flex sm:items-center sm:justify-between sm:flex-row flex-col gap-3">
        <Search />
        <h3 className="font-bold capitalize text-white-text">
          Total:{" "}
          <span className="text-green-500 font-semibold">${totalPrice}</span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold text-white-text">
            <tr>
              <td className="p-3">UserName</td>
              <td>Total</td>
              <td>Created At</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className="text-navlink">
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
