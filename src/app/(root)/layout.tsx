import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};
export default RootLayout;
