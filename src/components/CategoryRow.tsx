import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/types";
import { deleteCategory } from "@/actions/categories";
import Submit from "./Submit";
import AddNewLink from "./AddNewLink";
import { Avatar } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  category: CategoryType;
};
const CategoryRow = ({ category }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <Avatar
            src={category?.img}
            fallback={category?.title}
            showFallback
            isBordered
            color="primary"
            className="flex-shrink-0"
          />
          <span>{category.title}</span>
        </div>
      </td>
      <td className="p-3">{category.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <MyToolTip content="view this category details">
            <AddNewLink
              text="View"
              style="bg-primary border-none text-white-text"
              href={`/dashboard/categories/${category.id}`}
            />
          </MyToolTip>
          <form
            action={async () => {
              "use server";
              await deleteCategory(category.id, category.title);
            }}
          >
            <Submit
              style="bg-red-500 text-white-text border-none"
              text="Delete"
              tooltipContent="delete this category"
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default CategoryRow;
