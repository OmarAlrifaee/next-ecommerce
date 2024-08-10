import { getAllProducts } from "@/actions/products";
import AddNewLink from "@/components/AddNewLink";
import Catergories from "@/components/Catergories";
import ProductsTable from "@/components/pages/ProductsTable";
import PagesLoader from "@/components/PagesLoader";
import Search from "@/components/Search";
import MyToolTip from "@/components/shared/MyToolTip";
import { Metadata } from "next";
import { Suspense } from "react";
type Props = {
  searchParams: {
    search: string;
    page: string;
    category: string;
  };
};
const Products = async ({ searchParams }: Props) => {
  return (
    <section className="bg-main-bg rounded-md border-1 mt-5">
      <div className="p-5 mt-3 flex md:items-center md:justify-between md:flex-row gap-3 flex-col">
        <div className="flex items-center gap-5 md:flex-row flex-col">
          <Search />
          <Catergories />
        </div>
        <MyToolTip content="Add New product">
          <AddNewLink
            text="Add Product"
            href="/dashboard/products/add"
            style="md:w-fit w-full md:text-start text-center bg-black-text rounded-md font-bold text-white-text border-none"
          />
        </MyToolTip>
      </div>
      <Suspense fallback={<PagesLoader />}>
        <ProductsTable searchParams={searchParams} />
      </Suspense>
    </section>
  );
};
export default Products;
export const metadata: Metadata = {
  title: "products",
};
