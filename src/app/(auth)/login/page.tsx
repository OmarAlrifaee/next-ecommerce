import { login } from "@/actions/users";
import Submit from "@/components/Submit";
import { Input } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex-1 bg-main-bg capitalize md:px-20">
      <h3 className="font-semibold text-3xl text-black-text mt-5">
        Log in to Exclusive
      </h3>
      <p className="text-lg text-black-text mt-3 font-semibold">
        Enter your details below
      </p>
      <form action={login} className="flex flex-col gap-4 mt-5">
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
          text="Login"
          style="bg-button-2 hover:bg-button-2-hover text-white-text border-none mt-3 rounded-md font-bold"
          tooltipContent="Log In"
        />
        <p className="mt-5">
          do not have an account?{" "}
          <Link
            href={"/signup"}
            className="underline text-black-text font-semibold"
          >
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
export const metadata: Metadata = {
  title: "login",
};
