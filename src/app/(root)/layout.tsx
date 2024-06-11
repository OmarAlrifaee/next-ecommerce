import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};
export default RootLayout;
