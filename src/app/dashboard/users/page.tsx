import { getAllUsers } from "@/actions/users";
import AddNewLink from "@/components/AddNewLink";
import Pagenation from "@/components/Pagenation";
import Search from "@/components/Search";
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
    <section className="bg-main-soft-bg">
      <div className="p-5 mt-3 flex sm:flex-row gap-3 flex-col items-center justify-between">
        <Search style="sm:w-fit w-full" dashboard />{" "}
        <AddNewLink
          href="/dashboard/users/add"
          text="Add User"
          style="sm:w-fit w-full sm:text-start text-center"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5">
          <thead className="font-semibold">
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
