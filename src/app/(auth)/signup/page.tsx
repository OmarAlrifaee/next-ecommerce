import { signUp } from "@/actions/users";
import Submit from "@/components/Submit";
import { Metadata } from "next";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={signUp}
        className="flex flex-col gap-5 shadow-md rounded-md p-5 bg-main-soft-bg"
      >
        <h3 className="capitalize font-bold text-3xl text-center text-black">
          Sign Up
        </h3>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-black">
            User Name:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="outline-none focus:outline-none px-4 py-2 bg-gray-100 rounded-md"
            required
          />
        </div>
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
          text="Sign Up"
          style="bg-blue-500 text-white hover:bg-primary disabled:bg-blue-300"
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
