import { getAllUsers } from "@/actions/users";
import AddNewLink from "@/components/AddNewLink";
import Pagenation from "@/components/Pagenation";
import Search from "@/components/Search";
import MyToolTip from "@/components/shared/MyToolTip";
import UserRow from "@/components/UserRow";
import { Metadata } from "next";
type Props = {
  searchParams: {
    search: string;
    page: string;
  };
};
const Users = async ({ searchParams }: Props) => {
  const { users, count } = await getAllUsers(
    searchParams.search,
    searchParams.page
  );
  return (
    <section className="bg-main-bg border-1 rounded-md">
      <div className="p-5 mt-3 flex md:flex-row gap-3 flex-col items-center justify-between">
        <Search />
        <MyToolTip content="Add New User">
          <AddNewLink
            href="/dashboard/users/add"
            text="Add User"
            style="md:w-fit w-full md:text-start text-center bg-black-text font-bold text-white-text border-none"
          />
        </MyToolTip>
      </div>
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
    </section>
  );
};
export default Users;
export const metadata: Metadata = {
  title: "users",
};
