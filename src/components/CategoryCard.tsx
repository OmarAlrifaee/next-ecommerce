import { CategoryType } from "@/types";
import Image from "next/image";
import { Card, CardHeader, CardFooter } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
type Props = {
  category: CategoryType;
};
const CategoryCard = ({ category }: Props) => {
  return (
    <Card
      shadow="sm"
      className="overflow-hidden capitalize md:w-[300px] w-full bg-main-bg min-h-[200px] "
    >
      <CardHeader>
        <div className="relative w-full h-[200px] group bg-main-soft-bg">
          <Image
            src={category.img || "/noproduct.jpg"}
            alt={`${category.title} image`}
            fill
            className="transition group-hover:blur-sm"
          />
          <MyToolTip content={`see ${category.title} products in shop`}>
            <Link
              href={`/shop?category=${category.title}&page=1`}
              className="absolute group-hover:flex items-center justify-center w-full h-full left-0 top-0 z-10 hidden"
            >
              <div className="p-2 bg-white-text rounded-full shadow-sm">
                <IoEyeSharp className="text-4xl" />
              </div>
            </Link>
          </MyToolTip>
        </div>
      </CardHeader>
      <CardFooter>
        <h3 className="font-semibold text-black-text text-lg">
          {category.title}
        </h3>
      </CardFooter>
    </Card>
  );
};
export default CategoryCard;
