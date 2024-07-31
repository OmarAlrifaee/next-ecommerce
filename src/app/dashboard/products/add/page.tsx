import { getAllCategories } from "@/actions/categories";
import { addProduct } from "@/actions/products";
import Submit from "@/components/Submit";
import { Metadata } from "next";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import MyCustomSelect from "@/components/shared/MyCustomSelect";
const AddProduct = async () => {
  const categories = await getAllCategories();
  return (
    <div className="bg-main-bg p-[20px] border-1 rounded-md mt-[20px]">
      <form action={addProduct}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
          <Input
            type="text"
            label="Title"
            name="title"
            required
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
            isRequired
          />
          <MyCustomSelect categories={categories} isRequired />
          <Input
            type="number"
            label="Price"
            name="price"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
            isRequired
          />
          <Input
            type="text"
            label="Size"
            name="size"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
          />
          <Input
            type="text"
            label="image url"
            name="img"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
          />
          <Input
            type="number"
            label="Stock"
            name="stock"
            min={1}
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
            isRequired
          />
          <Input
            type="color"
            name="color"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
          />
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <Textarea
            name="desc"
            id="desc"
            label="Description"
            className=" text-white-text font-semibold min-h-[200px] resize-y"
            radius="md"
            size="lg"
            variant="underlined"
            isRequired
          ></Textarea>
          <Submit
            text="Add Product"
            style="bg-black-text text-white-text font-bold w-full border-none"
            tooltipContent="Add new product"
          />
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
export const metadata: Metadata = {
  title: "add product",
};
