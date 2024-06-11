import { getAllCategories } from "@/actions/categories";
import { getAllProducts } from "@/actions/products";
import Catergories from "@/components/Catergories";
import Search from "@/components/Search";

type Props = {
  searchParams: {
    category: string;
    search: string;
    page: string;
  };
};
const Shop = async ({ searchParams }: Props) => {
  const { products, productsCount } = await getAllProducts(
    searchParams.page,
    searchParams.category,
    searchParams.search
  );
  const categories = await getAllCategories();
  return (
    <div className="flex items-center justify-center gap-5">
      <Catergories categories={categories} />
      <Search />
    </div>
  );
};
export default Shop;