import { login } from "@/actions/users";
import Submit from "@/components/Submit";
import { Input } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={login}
        className="flex flex-col gap-5 shadow-md rounded-md p-5 bg-main-soft-bg sm:w-[30%] w-[75%]"
      >
        <h3 className="capitalize font-bold text-3xl text-center text-white-text mb-5">
          Login
        </h3>
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
          text="Login"
          style="bg-primary text-white-text bg-primary border-none"
          tooltipContent="login"
        />
        <Link href={"/signup"} className="underline text-primary font-semibold">
          Sign Up
        </Link>
      </form>
    </div>
  );
};
export default Login;
export const metadata: Metadata = {
  title: "login",
};
