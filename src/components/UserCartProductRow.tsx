import Submit from "./Submit";
import Image from "next/image";
import { ProductType } from "@/types";
import { deleteUserProductFromCart } from "@/actions/cartDashboard";
type Props = {
  cartProduct: { product: ProductType; quantity: number };
  username: string;
};
const UserCartProductRow = ({ cartProduct, username }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <div className="flex-shrink-0 relative rounded-full overflow-hidden w-[40px] h-[40px]">
            <Image
              src={cartProduct.product.img || "/noproduct.jpg"}
              alt={cartProduct.product.title}
              fill
            />
          </div>
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
            style="bg-red-500 text-white transition hover:bg-red-200 py-[5px] px-[10px] rounded-md border-none cursor-pointer"
            text="Delete"
          />
        </form>
      </td>
    </tr>
  );
};
export default UserCartProductRow;
