import { addUser } from "@/actions/users";
import Submit from "@/components/Submit";
import { Metadata } from "next";
import { Input, Switch } from "@nextui-org/react";
import MyCustomSwitch from "@/components/shared/MyCustomSwitch";
const AddUser = () => {
  return (
    <div className="bg-main-soft-bg p-[20px] rounded-md mt-[20px]">
      <form action={addUser}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
          <Input
            type="text"
            label="UserName"
            name="username"
            required
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="email"
            label="Email"
            name="email"
            required
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="password"
            label="Password"
            name="password"
            required
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="text"
            label="Avatar Url"
            name="avatar"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
        </div>
        <div className="flex items-center gap-3 mt-5">
          <MyCustomSwitch isAdmin={false} />
          <label htmlFor="isAdmin" className="text-white-text capitalize">
            select to make the user an admin
          </label>
        </div>
        <Submit
          text="Add User"
          style="bg-primary text-white w-full mt-5 border-none"
          tooltipContent="Add User"
        />
      </form>
    </div>
  );
};
export default AddUser;
export const metadata: Metadata = {
  title: "add user",
};
