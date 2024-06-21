import { getAllProducts } from "@/actions/products";
import AddNewLink from "@/components/AddNewLink";
import Catergories from "@/components/Catergories";
import Pagenation from "@/components/Pagenation";
import ProductRow from "@/components/ProductRow";
import Search from "@/components/Search";
import { Metadata } from "next";
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
      <div className="p-5 mt-3 flex sm:items-center sm:justify-between sm:flex-row gap-3 flex-col">
        <div className="flex items-center gap-5 sm:flex-row flex-col">
          <Search style="sm:w-fit w-full" />
          <Catergories style="sm:w-fit w-full" />
        </div>
        <AddNewLink
          text="Add Product"
          href="/dashboard/products/add"
          style="sm:w-fit w-full sm:text-start text-center"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead>
            <tr>
              <td className="p-3">Title</td>
              <td className="p-3">Price</td>
              <td className="p-3">Created At</td>
              <td className="p-3">In Stock</td>
              <td className="p-3">Action</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagenation count={productsCount} />
    </section>
  );
};
export default Products;
export const metadata: Metadata = {
  title: "products",
};
