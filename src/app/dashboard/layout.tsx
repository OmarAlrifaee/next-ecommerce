import Sidebar from "@/components/Sidebar";
type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <section className="flex min-h-screen text-white">
      <Sidebar />
      <div className="flex-[4] p-5">{children}</div>
    </section>
  );
};
export default DashboardLayout;
