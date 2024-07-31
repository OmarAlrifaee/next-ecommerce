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
            color="secondary"
            className="flex-shrink-0"
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
            style="bg-button-2 text-white-text font-bold rounded-md border-none"
            text="Delete"
            tooltipContent={`delete this ${cartProduct.product.title} product from ${username} cart`}
          />
        </form>
      </td>
    </tr>
  );
};
export default UserCartProductRow;
