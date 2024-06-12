import { getAllCategories } from "@/actions/categories";
import { getAllProducts } from "@/actions/products";
import Catergories from "@/components/Catergories";
import Pagenation from "@/components/Pagenation";
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
    searchParams?.page,
    searchParams?.category,
    searchParams?.search
  );

  return (
    <section>
      <div className="flex items-center justify-center gap-5">
        <Catergories />
        <Search />
      </div>
      {/* products here */}
      <Pagenation count={productsCount} />
    </section>
  );
};
export default Shop;
