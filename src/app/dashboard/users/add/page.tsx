import { addUser } from "@/actions/users";
import Submit from "@/components/Submit";
import { Metadata } from "next";

const AddUser = () => {
  return (
    <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px]">
      <form action={addUser}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <input
            type="text"
            placeholder="Avatar Url"
            name="avatar"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
        </div>
        <div className="flex items-center gap-3 mt-5">
          <input type="checkbox" name="isAdmin" id="isAdmin" />
          <label htmlFor="isAdmin">select to make the user an admin</label>
        </div>
        <Submit text="Add User" style="bg-primary text-white w-full mt-5" />
      </form>
    </div>
  );
};
export default AddUser;
export const metadata: Metadata = {
  title: "add user",
};
