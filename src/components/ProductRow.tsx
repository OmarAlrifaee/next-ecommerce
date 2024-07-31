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
            color="secondary"
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
          <MyToolTip content={`View ${product.title} Details`}>
            <AddNewLink
              text="View"
              style="bg-black-text rounded-md font-bold border-none text-white-text"
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
              tooltipContent={`delete ${product.title}`}
              style="bg-button-2 font-bold rounded-md text-white-text border-none "
              text="Delete"
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default ProductRow;
