"use client";

import AddNewLink from "@/components/AddNewLink";
import { Button } from "@nextui-org/react";

type Props = {
  error: Error;
  reset: () => void;
};
const error = ({ error, reset }: Props) => {
  return (
    <section className="p-10 min-h-screen bg-main-bg flex items-center justify-center">
      <div className="h-1/2 md:w-1/2 rounded-md bg-main-soft-bg p-10 flex flex-col gap-10">
        <h3 className="text-white-text font-bold capitalize text-5xl text-center">
          {error.message}
        </h3>
        <div className="flex items-center gap-5 justify-center">
          <Button
            onClick={reset}
            className="font-bold text-white-text bg-red-500"
          >
            Try Agine
          </Button>
          <AddNewLink
            href="/login"
            text="Go To Login"
            style="bg-primary text-white-text border-none"
          />
        </div>
      </div>
    </section>
  );
};
export default error;
