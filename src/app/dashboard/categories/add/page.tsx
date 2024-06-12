import { addCategory } from "@/actions/categories";
import Submit from "@/components/Submit";

const AddProduct = async () => {
  return (
    <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px]">
      <form action={addCategory}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10">
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
        <Submit text="Add Category" style="bg-main-bg text-white w-full mt-5" />
      </form>
    </div>
  );
};
export default AddProduct;