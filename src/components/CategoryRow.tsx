import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/types";
import { deleteCategory } from "@/actions/categories";
import Submit from "./Submit";
type Props = {
  category: CategoryType;
};
const CategoryRow = ({ category }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <Image
            src={category?.img || "/noproduct.jpg"}
            alt={category.title}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>{category.title}</span>
        </div>
      </td>
      <td className="p-3">{category.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <Link href={`/dashboard/categories/${category.id}`}>
            <button className="bg-[teal] py-[5px] px-[10px] rounded-sm border-none cursor-pointer">
              View
            </button>
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteCategory(category.id);
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
export default CategoryRow;
