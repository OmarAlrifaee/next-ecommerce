import Submit from "./Submit";
import Image from "next/image";
import { ProductType } from "@/types";
import { deleteUserProductFromCart } from "@/actions/cartDashboard";
type Props = {
  product: ProductType;
  username: string;
};
const UserCartProductRow = ({ product, username }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <div className="flex-shrink-0 relative rounded-full overflow-hidden w-[40px] h-[40px]">
            <Image
              src={product.img || "/noproduct.jpg"}
              alt={product.title}
              fill
            />
          </div>
          <span>{product.title}</span>
        </div>
      </td>
      <td className="p-3">{`${product.desc.slice(0, 50)} ${
        product.desc.length > 50 ? "..." : ""
      }`}</td>
      <td className="p-3">${product.price}</td>
      <td className="p-3">{product.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">
        <form
          action={async () => {
            "use server";
            await deleteUserProductFromCart(username, product.id);
          }}
        >
          <Submit
            style="bg-[crimson] py-[5px] px-[10px] rounded-sm border-none cursor-pointer"
            text="Delete"
          />
        </form>
      </td>
    </tr>
  );
};
export default UserCartProductRow;
