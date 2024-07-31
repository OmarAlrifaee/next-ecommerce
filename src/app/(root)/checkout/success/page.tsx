import AddNewLink from "@/components/AddNewLink";
import Card from "@/components/Card";
import { Metadata } from "next";

const page = () => {
  return (
    <section className="md:p-10 p-5 flex items-center justify-center min-h-screen">
      <Card>
        <h2 className="capitalize text-4xl text-button-1 font-bold flex flex-col gap-5 text-center">
          Success:
          <span className="font-semibold text-lg italic text-black-text">
            You Products On The Way Thank You For Your Trust
          </span>
        </h2>
        <div className="flex items-center justify-center gap-5">
          <AddNewLink
            href="/"
            text="To Home"
            style="text-center bg-black-text border-none text-white-text font-bold"
          />
          <AddNewLink
            href="/cart"
            text="To Your Cart"
            style="text-center bg-button-1 font-bold text-white-text border-none"
          />
        </div>
      </Card>
    </section>
  );
};
export default page;
export const metadata: Metadata = {
  title: "Paid Successfully",
};
