import AddNewLink from "@/components/AddNewLink";

const page = () => {
  return (
    <section className="p-10 flex items-center justify-center min-h-screen">
      <div className="bg-main-soft-bg rounded-md p-5 flex items-center justify-center flex-col gap-5">
        <h2 className="capitalize text-4xl text-green-500 font-bold flex flex-col gap-5 text-center">
          Success:
          <span className="font-semibold text-lg italic text-white">
            You Products On The Way Thank You For Your Trust
          </span>
        </h2>
        <div className="flex items-center justify-center gap-5">
          <AddNewLink href="/" text="To Home" style="block text-center" />
          <AddNewLink
            href="/cart"
            text="To Your Cart"
            style="block text-center bg-red-500 hover:bg-red-200"
          />
        </div>
      </div>
    </section>
  );
};
export default page;
