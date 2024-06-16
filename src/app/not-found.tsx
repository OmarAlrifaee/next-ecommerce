import AddNewLink from "@/components/AddNewLink";

const NotFoundPage = () => {
  return (
    <section className="p-10 flex items-center justify-center min-h-screen">
      <div className="bg-main-soft-bg rounded-md p-5 flex items-center justify-center flex-col gap-5">
        <h2 className="capitalize text-4xl text-red-500 font-bold flex flex-col gap-5 text-center">
          Not Found
          <span className="font-semibold text-lg italic text-white">
            This page Is Not Found Make Sure You Are On The Correct Url
          </span>
        </h2>
        <AddNewLink href="/" text="Go Home" style="block text-center" />
      </div>
    </section>
  );
};
export default NotFoundPage;
