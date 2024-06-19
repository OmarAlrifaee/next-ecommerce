import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types";
import { deleteProduct } from "@/actions/products";
import Submit from "./Submit";
import AddNewLink from "./AddNewLink";
type Props = {
  product: ProductType;
};
const ProductRow = ({ product }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <div className="flex-shrink-0 relative rounded-full overflow-hidden w-[40px] h-[40px]">
            <Image
              src={product?.img || "/noproduct.jpg"}
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
      <td className="p-3">{product.stock}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <AddNewLink
            text="View"
            style="bg-primary transition hover:bg-blue-200 py-[5px] px-[10px] rounded-md border-none cursor-pointer"
            href={`/dashboard/products/${product.id}`}
          />
          <form
            action={async () => {
              "use server";
              await deleteProduct(product.id);
            }}
          >
            <Submit
              style="bg-red-500 transition hover:bg-red-200 py-[5px] px-[10px] rounded-md border-none cursor-pointer"
              text="Delete"
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default ProductRow;
