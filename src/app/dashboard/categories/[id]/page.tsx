import { getOneCategory, updateCategory } from "@/actions/categories";
import Submit from "@/components/Submit";
import { CategoryType } from "@/types";
import { Input } from "@nextui-org/react";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};
export const generateMetadata = async ({ params }: Props) => {
  const category = (await getOneCategory(params.id)) as CategoryType;
  return {
    title: `${category.title} category`,
  };
};
const CategoryDetails = async ({ params }: Props) => {
  const category = (await getOneCategory(params.id)) as CategoryType;
  return (
    <section className="flex md:gap-10 gap-5 md:flex-nowrap flex-wrap">
      <div className="md:w-[400px] bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit w-full">
        <div className="h-[300px] w-full relative rounded-md overflow-hidden">
          <Image src={category?.img || "/noproduct.jpg"} alt="" fill />
        </div>
        <p className="mt-3 font-semibold text-white-text">{category.title}</p>
      </div>
      <div className="flex-grow bg-main-soft-bg p-[20px] rounded-md mt-[20px]">
        <form
          action={async (data) => {
            "use server";
            await updateCategory(data, category.id);
          }}
          className="flex flex-col gap-5"
        >
          <Input
            type="text"
            label={category.title}
            name="title"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="text"
            label="Image Url"
            name="img"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Submit
            text="Update Category"
            style="bg-primary text-white w-full mt-5 border-none"
            tooltipContent="Update category"
          />
        </form>
      </div>
    </section>
  );
};
export default CategoryDetails;
