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
    <section className="flex md:gap-10 gap-5 p-[20px] bg-main-bg md:flex-nowrap rounded-md border-1 flex-wrap">
      <div className="h-[250px] md:w-[400px] w-full relative rounded-md overflow-hidden">
        <Image src={category?.img || "/noavatar.jpg"} alt="" fill />
      </div>
      <div className="flex-grow p-[20px] rounded-md mt-[20px]">
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
            variant="underlined"
          />
          <Input
            type="text"
            label="Image Url"
            name="img"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
          />
          <Submit
            text="Update Category"
            style="bg-black-text font-bold rounded-md text-white-text w-full mt-5 border-none"
            tooltipContent="Update category"
          />
        </form>
      </div>
    </section>
  );
};
export default CategoryDetails;
