import AddNewLink from "@/components/AddNewLink";
import Card from "@/components/Card";
import { Metadata } from "next";

const page = () => {
  return (
    <section className="p-10 flex items-center justify-center min-h-screen">
      <Card>
        <h2 className="capitalize text-4xl text-green-500 font-bold flex flex-col gap-5 text-center">
          Success:
          <span className="font-semibold text-lg italic text-white-text">
            You Products On The Way Thank You For Your Trust
          </span>
        </h2>
        <div className="flex items-center justify-center gap-5">
          <AddNewLink
            href="/"
            text="To Home"
            style="text-center bg-primary border-none text-white-text"
          />
          <AddNewLink
            href="/cart"
            text="To Your Cart"
            style="text-center bg-red-500 text-white-text border-none"
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
