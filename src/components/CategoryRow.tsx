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
            color="secondary"
            className="flex-shrink-0"
          />
          <span>{category.title}</span>
        </div>
      </td>
      <td className="p-3">{category.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <MyToolTip content={`View ${category.title} Category Details`}>
            <AddNewLink
              text="View"
              style="bg-black-text font-bold rounded-md border-none text-white-text"
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
              style="bg-button-2 rounded-md font-bold text-white-text border-none"
              text="Delete"
              tooltipContent={`Delete ${category.title} Category`}
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default CategoryRow;
