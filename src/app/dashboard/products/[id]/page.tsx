import { getAllCategories } from "@/actions/categories";
import { getOneProduct, updateProduct } from "@/actions/products";
import MyCustomSelect from "@/components/shared/MyCustomSelect";
import Submit from "@/components/Submit";
import { ProductType } from "@/types";
import Image from "next/image";
import { Input, Textarea } from "@nextui-org/react";
type Props = {
  params: {
    id: string;
  };
};
export const generateMetadata = async ({ params }: Props) => {
  const product = (await getOneProduct(params.id)) as ProductType;
  return {
    title: `${product.title} product`,
  };
};
const ProductDetails = async ({ params }: Props) => {
  const product = (await getOneProduct(params.id)) as ProductType;
  const categories = await getAllCategories();
  return (
    <section className="flex md:gap-10 gap-5 md:flex-nowrap flex-wrap">
      <div className="md:w-[400px] bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit  w-full">
        <div className="h-[300px] w-full relative rounded-md overflow-hidden">
          <Image src={product?.img || "/noproduct.jpg"} alt="" fill />
        </div>
        <p className="mt-3 font-semibold text-white-text">{product.title}</p>
      </div>
      <div className="flex-grow bg-main-soft-bg p-[20px] rounded-md mt-[20px]">
        <form
          action={async (data) => {
            "use server";
            await updateProduct(data, product.id);
          }}
          className="flex flex-col gap-5"
        >
          <Input
            type="text"
            label={`${product?.title?.slice(0, 60)}...`}
            name="title"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="number"
            label={product.price.toString()}
            name="price"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="text"
            label={product?.size}
            name="size"
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
          <Input
            type="number"
            label={product.stock.toString()}
            name="stock"
            min={product.stock}
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />{" "}
          <MyCustomSelect
            categories={categories}
            currentProductCategory={product?.category}
          />
          <Input
            type="color"
            label={product?.color}
            name="color"
            style={{ backgroundColor: product?.color }}
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <div className="mt-10 flex flex-col gap-5">
            <Textarea
              name="desc"
              id="desc"
              label="Description"
              placeholder={product?.desc}
              className=" text-white-text font-semibold min-h-[200px] resize-y"
              radius="md"
              size="lg"
            ></Textarea>
            <Submit
              text="Update Product"
              style="bg-primary text-white w-full border-none"
              tooltipContent="Update Product"
            />
          </div>
        </form>
      </div>
    </section>
  );
};
export default ProductDetails;
