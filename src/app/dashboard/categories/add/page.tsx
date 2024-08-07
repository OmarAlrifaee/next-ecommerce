import { addCategory } from "@/actions/categories";
import Submit from "@/components/Submit";
import { Input } from "@nextui-org/react";
import { Metadata } from "next";

const AddProduct = async () => {
  return (
    <div className="bg-main-bg p-[20px] mt-[20px] border-1 rounded-md">
      <form action={addCategory}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
          <Input
            type="text"
            label="Category Name"
            name="title"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
            isRequired
          />
          <Input
            type="text"
            label="image Url"
            name="img"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
          />
        </div>
        <Submit
          text="Add Category"
          style="bg-black-text font-bold rounded-md text-white-text w-full mt-5 border-none"
          tooltipContent="Add category"
        />
      </form>
    </div>
  );
};
export default AddProduct;
export const metadata: Metadata = {
  title: "add catergoy",
};
