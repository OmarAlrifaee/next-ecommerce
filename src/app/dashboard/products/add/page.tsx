import { getAllCategories } from "@/actions/categories";
import { addProduct } from "@/actions/products";
import Submit from "@/components/Submit";
import { Metadata } from "next";

const AddProduct = async () => {
  const categories = await getAllCategories();
  return (
    <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px]">
      <form action={addProduct}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10">
          <input
            type="text"
            placeholder="Title"
            name="title"
            required
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <select
            name="category"
            id="category"
            className=" p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          >
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.title}
                className="bg-main-soft-bg"
              >
                {cat.title}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price"
            name="price"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder="Size"
            name="size"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder="image url"
            name="img"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />{" "}
          <input
            type="color"
            placeholder="Color"
            name="color"
            className="p-[15px] focus:outline-none  rounded-md bg-main-bg text-white font-semibold"
          />
        </div>{" "}
        <div className="mt-10 flex flex-col gap-5">
          <textarea
            name="desc"
            id="desc"
            placeholder="Description"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold min-h-[200px]"
          ></textarea>
          <Submit text="Add Product" style="bg-primary text-white w-full" />
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
export const metadata: Metadata = {
  title: "add product",
};
