import Submit from "./Submit";
import { ProductType } from "@/types";
import { deleteUserProductFromCart } from "@/actions/cartDashboard";
import { Avatar } from "@nextui-org/react";
type Props = {
  cartProduct: { product: ProductType; quantity: number };
  username: string;
};
const UserCartProductRow = ({ cartProduct, username }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <Avatar
            src={cartProduct?.product?.img}
            fallback={cartProduct.product.title}
            showFallback
            isBordered
            color="primary"
          />
          <span>{cartProduct.product.title}</span>
        </div>
      </td>
      <td className="p-3">${cartProduct.product.price}</td>
      <td className="p-3">
        {cartProduct.product.createdAt?.toLocaleDateString()}
      </td>
      <td className="p-3">{cartProduct.quantity}</td>
      <td className="p-3">{cartProduct.product.stock}</td>
      <td className="p-3">
        <form
          action={async () => {
            "use server";
            await deleteUserProductFromCart(username, cartProduct.product.id);
          }}
        >
          <Submit
            style="bg-red-500 text-white-text border-none"
            text="Delete"
            tooltipContent="delete this product from user cart"
          />
        </form>
      </td>
    </tr>
  );
};
export default UserCartProductRow;
