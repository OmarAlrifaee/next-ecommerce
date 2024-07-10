import { login } from "@/actions/users";
import Submit from "@/components/Submit";
import { Metadata } from "next";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={login}
        className="flex flex-col gap-5 shadow-md rounded-md p-5 bg-main-soft-bg"
      >
        <h3 className="capitalize font-bold text-3xl text-center text-black">
          Login
        </h3>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-black">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="outline-none focus:outline-none px-4 py-2 bg-gray-100 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-black">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="outline-none focus:outline-none px-4 py-2 bg-gray-100 rounded-md"
            required
          />
        </div>
        <Submit
          text="Login"
          style="bg-blue-500 text-white hover:bg-primary disabled:bg-blue-300"
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
