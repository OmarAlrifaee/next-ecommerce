"use client";

import AddNewLink from "@/components/AddNewLink";

type Props = {
  error: Error;
  reset: () => void;
};
const error = ({ error, reset }: Props) => {
  return (
    <section className="p-10 min-h-screen bg-main-bg flex items-center justify-center">
      <div className="h-1/2 w-1/2 rounded-md bg-main-soft-bg p-10 flex flex-col gap-10">
        <h3 className="text-black font-bold capitalize text-5xl text-center">
          {error.message}
        </h3>
        <div className="flex items-center gap-5 justify-center">
          <button
            onClick={reset}
            className="font-bold text-white bg-red-500 rounded-md px-5 py-2 transition hover:bg-red-200"
          >
            Try Agine
          </button>
          <AddNewLink href="/login" text="Go To Login" />
        </div>
      </div>
    </section>
  );
};
export default error;
