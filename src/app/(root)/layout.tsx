import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopNavBar from "@/components/TopNavBar";

type Props = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <main>
      <Navbar />
      <TopNavBar />
      {children}
      <Footer />
    </main>
  );
};
export default RootLayout;
