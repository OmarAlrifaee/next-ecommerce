import AddNewLink from "@/components/AddNewLink";
import UsersTable from "@/components/pages/UsersTable.tsx";
import PagesLoader from "@/components/PagesLoader";
import Search from "@/components/Search";
import MyToolTip from "@/components/shared/MyToolTip";
import { Metadata } from "next";
import { Suspense } from "react";
type Props = {
  searchParams: {
    search: string;
    page: string;
  };
};
const Users = async ({ searchParams }: Props) => {
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
      <Suspense fallback={<PagesLoader />}>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </section>
  );
};
export default Users;
export const metadata: Metadata = {
  title: "users",
};
