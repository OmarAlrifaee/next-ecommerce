import { CategoryType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
type Props = {
  category: CategoryType;
};
const CategoryCard = ({ category }: Props) => {
  return (
    <div className="rounded-md shadow-md overflow-hidden capitalize w-[300px] flex flex-col gap-3 pb-5 bg-main-soft-bg">
      <div className="relative w-full h-[200px]">
        <Image
          src={category.img || "/noproduct.jpg"}
          alt={`${category.title} image`}
          fill
        />
      </div>
      <div className="flex items-center justify-between px-5 mt-5">
        <h3 className="font-bold text-white text-xl px-5">{category.title}</h3>
        <AddNewLink
          href={`/shop?category=${category.title}&page=1`}
          text="see in shop"
        />
      </div>
    </div>
  );
};
export default CategoryCard;