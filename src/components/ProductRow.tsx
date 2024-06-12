import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types";
import { deleteProduct } from "@/actions/products";
import Submit from "./Submit";
type Props = {
  product: ProductType;
};
const ProductRow = ({ product }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <Image
            src={product?.img || "/noproduct.jpg"}
            alt={product.title}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
          <span>{product.title}</span>
        </div>
      </td>
      <td className="p-3">{product.desc}</td>
      <td className="p-3">${product.price}</td>
      <td className="p-3">{product.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <Link href={`/dashboard/products/${product.id}`}>
            <button className="bg-[teal] py-[5px] px-[10px] rounded-sm border-none cursor-pointer">
              View
            </button>
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteProduct(product.id);
            }}
          >
            <Submit
              style="bg-[crimson] py-[5px] px-[10px] rounded-sm border-none cursor-pointer"
              text="Delete"
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default ProductRow;
