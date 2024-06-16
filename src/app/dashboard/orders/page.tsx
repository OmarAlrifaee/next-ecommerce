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
  return (
    <section className="bg-main-soft-bg mt-5">
      <div className="p-5 mt-3 flex sm:items-center sm:justify-between sm:flex-row flex-col gap-3">
        <Search />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead>
            <tr>
              <td className="p-3">UserName</td>
              <td>Total</td>
              <td>Created At</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
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
