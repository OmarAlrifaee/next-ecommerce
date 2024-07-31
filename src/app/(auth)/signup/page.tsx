import { signUp } from "@/actions/users";
import Submit from "@/components/Submit";
import { Metadata } from "next";
import Link from "next/link";
import { Input } from "@nextui-org/react";

const SignUp = () => {
  return (
    <div className="flex-1 bg-main-bg capitalize md:px-20">
      <h3 className="font-semibold text-3xl text-black-text mt-5">
        create an account
      </h3>
      <p className="text-lg text-black-text mt-3 font-semibold">
        enter your details below
      </p>
      <form action={signUp} className="flex flex-col gap-4 mt-5">
        <Input
          type="text"
          id="username"
          name="username"
          label="username"
          required
          size="sm"
          radius="md"
          variant="underlined"
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          required
          size="sm"
          radius="md"
          variant="underlined"
        />
        <Input
          type="password"
          id="password"
          label="Password"
          name="password"
          required
          size="sm"
          radius="md"
          variant="underlined"
        />
        <Submit
          text="Create Account"
          style="bg-button-2 hover:bg-button-2-hover text-white-text border-none mt-3 rounded-md font-bold"
          tooltipContent="sign up"
        />
        <p className="mt-5">
          do you have an account?{" "}
          <Link href={"/login"} className="underline text-black-text font-bold">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
export const metadata: Metadata = {
  title: "sign up",
};
