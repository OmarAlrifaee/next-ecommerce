import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/types";
import { deleteCategory } from "@/actions/categories";
import Submit from "./Submit";
import AddNewLink from "./AddNewLink";
type Props = {
  category: CategoryType;
};
const CategoryRow = ({ category }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <div className="flex-shrink-0 relative rounded-full overflow-hidden w-[40px] h-[40px]">
            <Image
              src={category.img || "/noproduct.jpg"}
              alt={category.title}
              fill
            />
          </div>
          <span>{category.title}</span>
        </div>
      </td>
      <td className="p-3">{category.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <AddNewLink
            text="View"
            style="bg-primary transition hover:bg-blue-200 py-[5px] px-[10px] rounded-md border-none cursor-pointer"
            href={`/dashboard/categories/${category.id}`}
          />
          <form
            action={async () => {
              "use server";
              await deleteCategory(category.id, category.title);
            }}
          >
            <Submit
              style="bg-red-500 text-white transition hover:bg-red-200 py-[5px] px-[10px] rounded-md border-none cursor-pointer"
              text="Delete"
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default CategoryRow;
