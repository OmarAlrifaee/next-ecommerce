import { UserType } from "@/types";
import Image from "next/image";
import { getOneUser, updateUser } from "@/actions/users";
import Submit from "@/components/Submit";
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
      <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit md:w-fit w-full">
        <div className="md:w-[300px] h-[300px] w-full relative rounded-md overflow-hidden">
          <Image src={user?.avatar || "/noavatar.jpg"} alt="" fill />
        </div>
        <p className="mt-3 font-semibold">{user?.username}</p>
      </div>
      <div className="flex-grow bg-main-soft-bg p-[10px] rounded-md mt-[20px]">
        <form
          action={async (data) => {
            "use server";
            await updateUser(data, user?.id);
          }}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder={user?.username}
            name="username"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <input
            type="email"
            placeholder={user?.email}
            name="email"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <input
            type="avatar"
            placeholder="Avatar"
            name="avatar"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <div className="flex items-center gap-3 mt-5">
            <input type="checkbox" name="isAdmin" id="isAdmin" />
            <label htmlFor="isAdmin">select to make the user an admin</label>
          </div>
          <Submit text="Update User" style="bg-primary text-white w-full" />
        </form>
      </div>
    </section>
  );
};
export default UserDetails;
