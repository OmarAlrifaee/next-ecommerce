import AddNewLink from "@/components/AddNewLink";

const NotFoundPage = () => {
  return (
    <section className="p-10 flex items-center justify-center min-h-screen">
      <div className="bg-main-soft-bg rounded-md p-5 flex items-center justify-center flex-col gap-5">
        <h2 className="capitalize text-4xl text-button-2 font-bold flex flex-col gap-5 text-center">
          Not Found
          <span className="font-semibold text-lg italic text-black-text">
            This page Is Not Found Make Sure You Are On The Correct Url
          </span>
        </h2>
        <AddNewLink
          href="/"
          text="Go Home"
          style="text-center text-white-text bg-black-text font-bold border-none"
        />
      </div>
    </section>
  );
};
export default NotFoundPage;
