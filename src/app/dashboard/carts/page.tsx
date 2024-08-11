import CartsTable from "@/components/pages/CartsTable";
import UsersFilter from "@/components/UsersFilter";
type Props = {
  searchParams: {
    user: string;
  };
};
const CartPage = async ({ searchParams }: Props) => {
  return (
    <section className="bg-main-bg rounded-md border-1">
      <div className="p-5 mt-3 flex items-center justify-between">
        <UsersFilter />
      </div>
      <CartsTable searchParams={searchParams} />
    </section>
  );
};
export default CartPage;
