import { getAllProducts } from "@/actions/products";
import ProductRow from "../ProductRow";
import Pagenation from "../Pagenation";
type Props = {
  searchParams: {
    search: string;
    page: string;
    category: string;
  };
};
const ProductsTable = async ({ searchParams }: Props) => {
  const { productsCount, products } = await getAllProducts(
    searchParams.page,
    searchParams.category,
    searchParams.search
  );
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold text-black-text">
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
    </>
  );
};
export default ProductsTable;
