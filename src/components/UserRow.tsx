import Link from "next/link";
import Image from "next/image";
import { UserType } from "@/types";
import { deleteUser } from "@/actions/users";
import Submit from "./Submit";
import AddNewLink from "./AddNewLink";

type Props = {
  user: UserType;
  currentUserId?: string;
};
const UserRow = ({ user, currentUserId }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <div className="flex-shrink-0 relative rounded-full overflow-hidden w-[40px] h-[40px]">
            <Image
              src={user.avatar || "/noavatar.jpg"}
              alt={user.username}
              fill
            />
          </div>
          <span>{user.username}</span>
        </div>
      </td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">{user.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">{user.isAdmin ? "Admin" : "Not Admin"}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <AddNewLink
            text="View"
            style="bg-primary transition hover:bg-blue-200 py-[5px] px-[10px] rounded-md border-none cursor-pointer"
            href={`/dashboard/users/${user.id}`}
          />
          {currentUserId !== user.id ? (
            <form
              action={async () => {
                "use server";
                await deleteUser(user.id);
              }}
            >
              <Submit
                style="bg-red-500 tranistion hover:bg-red-200 py-[5px] px-[10px] rounded-md border-none cursor-pointer"
                text="Delete"
              />
            </form>
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  );
};
export default UserRow;
