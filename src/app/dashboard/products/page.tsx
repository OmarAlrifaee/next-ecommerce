import { getAllProducts } from "@/actions/products";
import Catergories from "@/components/Catergories";
import Pagenation from "@/components/Pagenation";
import ProductRow from "@/components/ProductRow";
import Search from "@/components/Search";
import { Metadata } from "next";
import Link from "next/link";
type Props = {
  searchParams: {
    search: string;
    page: string;
    category: string;
  };
};
const Products = async ({ searchParams }: Props) => {
  const { productsCount, products } = await getAllProducts(
    searchParams.page,
    searchParams.category,
    searchParams.search
  );
  return (
    <section className="bg-main-soft-bg mt-5">
      <div className="p-5 mt-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Catergories />
          <Search />
        </div>
        <Link
          href={"/dashboard/products/add"}
          className="bg-blue-500 font-semibold rounded-md px-5 py-2"
        >
          Add New
        </Link>
      </div>
      <table className="w-full mt-5">
        <thead>
          <tr>
            <td className="p-3">Title</td>
            <td className="p-3">Description</td>
            <td className="p-3">Price</td>
            <td className="p-3">Created At</td>
            <td className="p-3">Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}
        </tbody>
      </table>
      <Pagenation count={productsCount} />
    </section>
  );
};
export default Products;
export const metadata: Metadata = {
  title: "products",
};
