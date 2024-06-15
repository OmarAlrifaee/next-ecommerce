import { addCategory } from "@/actions/categories";
import Submit from "@/components/Submit";
import { Metadata } from "next";

const AddProduct = async () => {
  return (
    <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px]">
      <form action={addCategory}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
          <input
            type="text"
            placeholder="Title"
            name="title"
            required
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
          <input
            type="text"
            placeholder="image url"
            name="img"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold"
          />
        </div>
        <Submit text="Add Category" style="bg-primary text-white w-full mt-5 transition hover:bg-blue-200" />
      </form>
    </div>
  );
};
export default AddProduct;
export const metadata: Metadata = {
  title: "add catergoy",
};
