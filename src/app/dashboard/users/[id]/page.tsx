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
    <section className="flex md:gap-10 gap-5 p-[20px] bg-main-bg md:flex-nowrap rounded-md border-1 flex-wrap">
      <div className="h-[450px] md:w-[400px] w-full relative rounded-md overflow-hidden">
        <Image src={user?.avatar || "/noavatar.jpg"} alt="" fill />
      </div>
      <div className="flex-grow bg-main-bg p-[20px] rounded-md mt-[20px]">
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
            variant="underlined"
          />
          <Input
            type="email"
            label={user?.email}
            name="email"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
          />
          <Input
            type="avatar"
            label="Avatar"
            name="avatar"
            className="text-white-text font-semibold"
            radius="md"
            size="lg"
            variant="underlined"
          />
          <div className="flex items-center gap-3 mt-5">
            <MyCustomSwitch isAdmin={user?.isAdmin} />
            <label
              htmlFor="isAdmin"
              className="text-black-text font-semibold capitalize"
            >
              select to make the user an admin
            </label>
          </div>
          <Submit
            text="Update User"
            style="bg-black-text font-bold text-white w-full mt-5 border-none"
            tooltipContent="Update User"
          />
        </form>
      </div>
    </section>
  );
};
export default UserDetails;
