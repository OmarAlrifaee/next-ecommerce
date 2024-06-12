import Sidebar from "@/components/Sidebar";
type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <section className="flex bg-main-bg text-white min-h-screen">
      <Sidebar />
      <div className="flex-[4] p-5">{children}</div>
    </section>
  );
};
export default DashboardLayout;