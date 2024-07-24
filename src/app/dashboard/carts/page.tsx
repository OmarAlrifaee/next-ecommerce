import { getUserProductsFromCart } from "@/actions/cartDashboard";
import UserCartProductRow from "@/components/UserCartProductRow";
import UsersFilter from "@/components/UsersFilter";
type Props = {
  searchParams: {
    user: string;
  };
};
const CartPage = async ({ searchParams }: Props) => {
  const userProducts = searchParams.user
    ? await getUserProductsFromCart(searchParams.user)
    : [];
  return (
    <section className="bg-main-soft-bg">
      <div className="p-5 mt-3 flex items-center justify-between">
        <UsersFilter style="sm:w-fit w-full" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold text-white-text">
            <tr>
              <td className="p-3">Title</td>
              <td className="p-3">Price</td>
              <td className="p-3">Created At</td>
              <td className="p-3">Quantity</td>
              <td className="p-3">In Stock</td>
              <td className="p-3">Action</td>
            </tr>
          </thead>
          <tbody className="text-navlink">
            {userProducts?.length && searchParams.user
              ? userProducts?.map((cartProduct) => (
                  <UserCartProductRow
                    cartProduct={cartProduct}
                    username={searchParams.user}
                    key={cartProduct.product.id}
                  />
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default CartPage;
