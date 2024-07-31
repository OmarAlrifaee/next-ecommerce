import { getAllCategories } from "@/actions/categories";
import AddNewLink from "@/components/AddNewLink";
import CategoryRow from "@/components/CategoryRow";
import Search from "@/components/Search";
import MyToolTip from "@/components/shared/MyToolTip";
import { Metadata } from "next";

type Props = {
  searchParams: {
    search: string;
  };
};
const Categories = async ({ searchParams }: Props) => {
  const categories = await getAllCategories(searchParams.search);
  return (
    <section className="bg-main-bg border-1 rounded-md">
      <div className="p-5 mt-3 flex md:items-center md:justify-between md:flex-row flex-col gap-3">
        <Search />
        <MyToolTip content="Add new category">
          <AddNewLink
            text="Add Category"
            href="/dashboard/categories/add"
            style="md:text-start text-center bg-black-text rounded-md font-bold border-none text-white-text"
          />
        </MyToolTip>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold text-black-text">
            <tr>
              <td className="p-3">Title</td>
              <td>Created At</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <CategoryRow category={category} key={category.id} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default Categories;
export const metadata: Metadata = {
  title: "categories",
};
