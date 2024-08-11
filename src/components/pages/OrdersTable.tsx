import { getAllOrders } from "@/actions/order";
import OrderRow from "../OrderRow";

type Props = {
  searchParams: {
    search: string;
  };
};
const OrdersTable = async ({ searchParams }: Props) => {
  const orders = await getAllOrders(searchParams.search);
  return (
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
  );
};
export default OrdersTable;
