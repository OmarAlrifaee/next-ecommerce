import { getAllCategories } from "@/actions/categories";
import { getOneProduct, updateProduct } from "@/actions/products";
import Submit from "@/components/Submit";
import { ProductType } from "@/types";
import Image from "next/image";
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
      <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit md:w-fit w-full">
        <div className="md:w-[300px] h-[300px] w-full relative rounded-md overflow-hidden">
          <Image src={product?.img || "/noproduct.jpg"} alt="" fill />
        </div>
        <p className="mt-3 font-semibold">{product.title}</p>
      </div>
      <div className="flex-grow bg-main-soft-bg p-[10px] rounded-md mt-[20px]">
        <form
          action={async (data) => {
            "use server";
            await updateProduct(data, product.id);
          }}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder={product.title}
            name="title"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-black font-semibold"
          />
          <input
            type="number"
            placeholder={product.price.toString()}
            name="price"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-black font-semibold"
          />
          <input
            type="text"
            placeholder={product?.size}
            name="size"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-black font-semibold"
          />
          <input
            type="text"
            placeholder="image url"
            name="img"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-black font-semibold"
          />
          <input
            type="number"
            placeholder={product.stock.toString()}
            name="stock"
            min={product.stock}
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-black font-semibold"
          />{" "}
          <select
            name="category"
            id="category"
            className=" p-[15px] focus:outline-none rounded-md bg-main-bg text-black font-semibold"
          >
            {categories.map((cat) => (
              <option
                value={cat.title}
                key={cat.id}
                className="bg-main-soft-bg"
                selected={product.category === cat.title}
              >
                {cat.title}
              </option>
            ))}
          </select>
          <input
            type="color"
            placeholder={product?.color}
            name="color"
            style={{ backgroundColor: product?.color }}
            className={`p-[15px] focus:outline-none rounded-md text-black font-semibold`}
          />
          <div className="mt-10 flex flex-col gap-5">
            <textarea
              name="desc"
              id="desc"
              placeholder={product.desc}
              className="p-[15px] focus:outline-none rounded-md bg-main-bg text-black font-semibold min-h-[200px]"
            ></textarea>
            <Submit
              text="Update Product"
              style="bg-primary text-white w-full transition hover:bg-blue-200"
            />
          </div>
        </form>
      </div>
    </section>
  );
};
export default ProductDetails;
