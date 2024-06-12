import { getOneCategory, updateCategory } from "@/actions/categories";
import Submit from "@/components/Submit";
import { CategoryType } from "@/types";
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
    <section className="flex gap-10">
      <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit">
        <div className="size-[300px] relative rounded-md overflow-hidden">
          <Image src={category?.img || "/noproduct.jpg"} alt="" fill />
        </div>
        <p className="mt-3 font-semibold">{category.title}</p>
      </div>
      <div className="flex-grow bg-main-soft-bg p-[10px] rounded-md mt-[20px]">
        <form
          action={async (data) => {
            "use server";
            await updateCategory(data, category.id);
          }}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder={category.title}
            name="title"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder="image url"
            name="img"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <Submit
            text="Update Category"
            style="bg-primary text-white w-full mt-5"
          />
        </form>
      </div>
    </section>
  );
};
export default CategoryDetails;
