import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types";
import { deleteProduct } from "@/actions/products";
import Submit from "./Submit";
import AddNewLink from "./AddNewLink";
import { Avatar } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  product: ProductType;
};
const ProductRow = ({ product }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <Avatar
            src={product?.img}
            fallback={product?.title}
            showFallback
            isBordered
            color="primary"
            className="flex-shrink-0"
          />
          <span>{product.title}</span>
        </div>
      </td>
      <td className="p-3">${product.price}</td>
      <td className="p-3">{product.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">{product.stock}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <MyToolTip content="view this product details">
            <AddNewLink
              text="View"
              style="bg-primary border-none text-white-text"
              href={`/dashboard/products/${product.id}`}
            />
          </MyToolTip>
          <form
            action={async () => {
              "use server";
              await deleteProduct(product.id);
            }}
          >
            <Submit
              tooltipContent="delete this product"
              style="bg-red-500 text-white-text border-none "
              text="Delete"
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default ProductRow;
