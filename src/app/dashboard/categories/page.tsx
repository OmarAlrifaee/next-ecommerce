import { getAllCategories } from "@/actions/categories";
import AddNewLink from "@/components/AddNewLink";
import CategoryRow from "@/components/CategoryRow";
import Search from "@/components/Search";
import { Metadata } from "next";

type Props = {
  searchParams: {
    search: string;
  };
};
const Categories = async ({ searchParams }: Props) => {
  const categories = await getAllCategories(searchParams.search);
  return (
    <section className="bg-main-soft-bg mt-5">
      <div className="p-5 mt-3 flex sm:items-center sm:justify-between sm:flex-row flex-col gap-3">
        <Search dashboard />
        <AddNewLink
          text="Add Category"
          href="/dashboard/categories/add"
          style="sm:text-start text-center"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold">
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
