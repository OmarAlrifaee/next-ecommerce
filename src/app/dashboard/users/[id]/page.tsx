import { UserType } from "@/types";
import Image from "next/image";
import { getOneUser, updateUser } from "@/actions/users";
import Submit from "@/components/Submit";
import { Input, Switch } from "@nextui-org/react";
import MyCustomSwitch from "@/components/shared/MyCustomSwitch";
type Props = {
  params: {
    id: string;
  };
};
export const generateMetadata = async ({ params }: Props) => {
  const user = (await getOneUser(params.id)) as UserType;
  return {
    title: user.username,
  };
};
const UserDetails = async ({ params }: Props) => {
  const user = (await getOneUser(params.id)) as UserType;
  return (
    <section className="flex md:gap-10 gap-5 md:flex-nowrap flex-wrap">
      <div className="md:w-[400px] bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit w-full">
        <div className=" h-[300px] w-full relative rounded-md overflow-hidden">
          <Image src={user?.avatar || "/noavatar.jpg"} alt="" fill />
        </div>
        <p className="mt-3 font-semibold text-white-text">{user?.username}</p>
      </div>
      <div className="flex-grow bg-main-soft-bg p-[20px] rounded-md mt-[20px]">
        <form
          action={async (data) => {
            "use server";
            await updateUser(data, user?.id);
          }}
          className="flex flex-col gap-5"
        >
          <Input
            type="text"
            label={user?.username}
            name="username"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="email"
            label={user?.email}
            name="email"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <Input
            type="avatar"
            label="Avatar"
            name="avatar"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
          />
          <div className="flex items-center gap-3 mt-5">
            <MyCustomSwitch isAdmin={user?.isAdmin} />
            <label htmlFor="isAdmin" className="text-white-text capitalize">
              select to make the user an admin
            </label>
          </div>
          <Submit
            text="Update User"
            style="bg-primary text-white w-full mt-5 border-none"
            tooltipContent="Update User"
          />
        </form>
      </div>
    </section>
  );
};
export default UserDetails;
