import { OrderType } from "@/types";
import Submit from "./Submit";
import { deleteOrder } from "@/actions/order";
type Props = {
  order: OrderType;
};
const OrderRow = ({ order }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <span>{order.username}</span>
        </div>
      </td>
      <td>${order.total}</td>
      <td className="p-3">{order.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">
        <form
          action={async () => {
            "use server";
            await deleteOrder(order.userId);
          }}
        >
          <Submit
            style="bg-button-2 text-white-text font-bold rounded-md border-none"
            text="Delete"
            tooltipContent={`delete ${order.username} order`}
          />
        </form>
      </td>
    </tr>
  );
};
export default OrderRow;
