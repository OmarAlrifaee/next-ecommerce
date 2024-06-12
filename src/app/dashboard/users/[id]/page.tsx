import { UserType } from "@/types";
import Image from "next/image";
import { getOneUser, updateUser } from "@/actions/users";
import Submit from "@/components/Submit";
type Props = {
  params: {
    id: string;
  };
};
const UserDetails = async ({ params }: Props) => {
  const user = (await getOneUser(params.id)) as UserType;
  return (
    <section className="flex gap-10">
      <div className="bg-main-soft-bg p-[10px] rounded-md mt-[20px] h-fit">
        <div className="size-[300px] relative rounded-md overflow-hidden">
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
            type="password"
            placeholder="Password"
            name="password"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <input
            type="avatar"
            placeholder="Avatar"
            name="avatar"
            className="p-[15px] focus:outline-none rounded-md bg-main-bg text-white font-semibold "
          />
          <div className="flex items-center gap-3 mt-5">
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              checked={user?.isAdmin}
            />
            <label htmlFor="isAdmin">select to make the user an admin</label>
          </div>
          <Submit text="Update User" style="bg-main-bg text-white w-full" />
        </form>
      </div>
    </section>
  );
};
export default UserDetails;
