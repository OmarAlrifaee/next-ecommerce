import AddNewLink from "@/components/AddNewLink";
import CategoriesTable from "@/components/pages/CategoriesTable";
import Search from "@/components/Search";
import MyToolTip from "@/components/shared/MyToolTip";
import { Metadata } from "next";

type Props = {
  searchParams: {
    search: string;
  };
};
const Categories = async ({ searchParams }: Props) => {
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
      <CategoriesTable searchParams={searchParams} />
    </section>
  );
};
export default Categories;
export const metadata: Metadata = {
  title: "categories",
};
