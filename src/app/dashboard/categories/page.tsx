import { getAllCategories } from "@/actions/categories";
import AddNewLink from "@/components/AddNewLink";
import CategoryRow from "@/components/CategoryRow";
import Search from "@/components/Search";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  searchParams: {
    search: string;
  };
};
const Categories = async ({ searchParams }: Props) => {
  const categories = await getAllCategories(searchParams.search);
  return (
    <section className="bg-main-soft-bg mt-5">
      <div className="p-5 mt-3 flex items-center justify-between">
        <Search />
        <AddNewLink text="Add Category" href="/dashboard/categories/add" />
      </div>
      <table className="w-full mt-5">
        <thead>
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
    </section>
  );
};
export default Categories;
export const metadata: Metadata = {
  title: "categories",
};
