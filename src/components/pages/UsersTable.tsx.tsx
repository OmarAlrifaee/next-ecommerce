import { getAllUsers } from "@/actions/users";
import UserRow from "../UserRow";
import Pagenation from "../Pagenation";

type Props = {
  searchParams: {
    search: string;
    page: string;
  };
};
const UsersTable = async ({ searchParams }: Props) => {
  const { users, count } = await getAllUsers(
    searchParams.search,
    searchParams.page
  );
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold text-black-text">
            <tr>
              <td className="p-3">Name</td>
              <td className="p-3">Email</td>
              <td className="p-3">Created At</td>
              <td className="p-3">Role</td>
              <td className="p-3">Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagenation count={count} />
    </>
  );
};
export default UsersTable;
