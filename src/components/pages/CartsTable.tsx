import { getUserProductsFromCart } from "@/actions/cartDashboard";
import UserCartProductRow from "../UserCartProductRow";

type Props = {
  searchParams: {
    user: string;
  };
};
const CartsTable = async ({ searchParams }: Props) => {
  const userProducts = searchParams.user
    ? await getUserProductsFromCart(searchParams.user)
    : [];
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-5">
        <thead className="font-semibold text-black-text">
          <tr>
            <td className="p-3">Title</td>
            <td className="p-3">Price</td>
            <td className="p-3">Created At</td>
            <td className="p-3">Quantity</td>
            <td className="p-3">In Stock</td>
            <td className="p-3">Action</td>
          </tr>
        </thead>
        <tbody>
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
  );
};
export default CartsTable;
