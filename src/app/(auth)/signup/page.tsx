import { signUp } from "@/actions/users";
import Submit from "@/components/Submit";
import { Metadata } from "next";
import Link from "next/link";
import { Input } from "@nextui-org/react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={signUp}
        className="flex flex-col gap-5 shadow-md rounded-md p-5 bg-main-soft-bg w-[20%]"
      >
        <h3 className="capitalize font-bold text-3xl text-center text-white-text mb-5">
          Sign Up
        </h3>
        <Input
          type="text"
          id="username"
          name="username"
          label="username"
          required
          size="sm"
          radius="md"
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          required
          size="sm"
          radius="md"
        />
        <Input
          type="password"
          id="password"
          label="Password"
          name="password"
          required
          size="sm"
          radius="md"
        />
        <Submit
          text="Sign Up"
          style="bg-blue-500 text-white-text border-none"
          tooltipContent="sign up"
        />{" "}
        <Link href={"/login"} className="underline text-primary font-semibold">
          Login
        </Link>
      </form>
    </div>
  );
};
export default SignUp;
export const metadata: Metadata = {
  title: "sign up",
};
