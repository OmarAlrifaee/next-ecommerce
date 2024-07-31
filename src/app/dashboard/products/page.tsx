import { getAllProducts } from "@/actions/products";
import AddNewLink from "@/components/AddNewLink";
import Catergories from "@/components/Catergories";
import Pagenation from "@/components/Pagenation";
import ProductRow from "@/components/ProductRow";
import Search from "@/components/Search";
import MyToolTip from "@/components/shared/MyToolTip";
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
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold text-white-text">
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
