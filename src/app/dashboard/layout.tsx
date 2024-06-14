import { getCurrentUser } from "@/actions/users";
import BottomBar from "@/components/BottomBar";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
type Props = {
  children: React.ReactNode;
};
const DashboardLayout = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.isAdmin) redirect("/"); // redirect the user if he is not an admin
  return (
    <section className="xl:flex min-h-screen text-white">
      <BottomBar />
      <Sidebar currentUser={currentUser} />
      <div className="xl:flex-[4] p-5">{children}</div>
    </section>
  );
};
export default DashboardLayout;
