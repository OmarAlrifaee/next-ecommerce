import { getUserProductsFromCart } from "@/actions/cartDashboard";
import UserCartProductRow from "@/components/UserCartProductRow";
import UsersFilter from "@/components/UsersFilter";
import { ProductType } from "@/types";
type Props = {
  searchParams: {
    user: string;
  };
};
const CartPage = async ({ searchParams }: Props) => {
  let userProducts: ProductType[] | null = null;
  if (searchParams.user) {
    userProducts = await getUserProductsFromCart(searchParams.user);
  }
  console.log(userProducts);
  return (
    <section className="bg-main-soft-bg">
      <div className="p-5 mt-3 flex items-center justify-between">
        <UsersFilter />
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
          {userProducts?.length && searchParams.user
            ? userProducts?.map((product) => (
                <UserCartProductRow
                  product={product}
                  username={searchParams.user}
                  key={product.id}
                />
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};
export default CartPage;
