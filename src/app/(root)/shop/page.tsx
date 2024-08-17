import Catergories from "@/components/Catergories";
import PagesLoader from "@/components/PagesLoader";
import Search from "@/components/Search";
import ShopProducts from "@/components/pages/ShopProducts";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  searchParams: {
    category: string;
    search: string;
    page: string;
  };
};
const Shop = async ({ searchParams }: Props) => {
  return (
    <section className="md:p-10 p-5">
      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-center gap-5 ">
        <Catergories style="sm:w-fit w-full " />
        <Search />
      </div>
      <Suspense fallback={<PagesLoader />} key={searchParams?.page}>
        <ShopProducts searchParams={searchParams} />
      </Suspense>
    </section>
  );
};
export default Shop;
export const metadata: Metadata = {
  title: "shop",
};
