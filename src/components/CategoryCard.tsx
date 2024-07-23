import { CategoryType } from "@/types";
import Image from "next/image";
import AddNewLink from "./AddNewLink";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  category: CategoryType;
};
const CategoryCard = ({ category }: Props) => {
  return (
    <Card
      shadow="md"
      className="overflow-hidden capitalize w-[300px] flex flex-col gap-3 pb-5 bg-main-soft-bg"
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-[200px]">
          <Image
            src={category.img || "/noproduct.jpg"}
            alt={`${category.title} image`}
            fill
          />
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mt-5">
          <h3 className="font-bold text-white-text text-xl px-5">
            {category.title}
          </h3>
          <MyToolTip content="see category's products in shop">
            <AddNewLink
              href={`/shop?category=${category.title}&page=1`}
              text="see in shop"
              style="text-center text-navlink hover:text-primary"
            />
          </MyToolTip>
        </div>
      </CardBody>
    </Card>
  );
};
export default CategoryCard;
