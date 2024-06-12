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
const ProductDetails = async ({ params }: Props) => {
  const product = (await getOneProduct(params.id)) as ProductType;
  const categories = await getAllCategories();
  return (
    <section className="flex gap-10">
      <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit">
        <div className="size-[300px] relative rounded-md overflow-hidden">
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
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />

          <input
            type="number"
            placeholder={product.price.toString()}
            name="price"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder={product?.color}
            name="color"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder={product?.size}
            name="size"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder={product.desc}
            name="desc"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder="image url"
            name="img"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <select
            name="category"
            id="category"
            className=" p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
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
          <Submit text="Update Product" style="bg-main-bg text-white w-full" />
        </form>
      </div>
    </section>
  );
};
export default ProductDetails;
