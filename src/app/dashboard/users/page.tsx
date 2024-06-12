import { getAllUsers } from "@/actions/users";
import Pagenation from "@/components/Pagenation";
import Search from "@/components/Search";
import UserRow from "@/components/UserRow";
import { Metadata } from "next";
import Link from "next/link";
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
      <div className="p-5 mt-3 flex items-center justify-between">
        <Search />{" "}
        <Link
          href={"/dashboard/users/add"}
          className="bg-blue-500 font-semibold rounded-md px-5 py-2"
        >
          Add New
        </Link>
      </div>
      <table className="w-full mt-5">
        <thead>
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
      <Pagenation count={count} />
    </section>
  );
};
export default Users;
export const metadata: Metadata = {
  title: "users",
};
