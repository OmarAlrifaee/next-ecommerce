import Link from "next/link";
import Image from "next/image";
import { UserType } from "@/types";
import { deleteUser } from "@/actions/users";
import Submit from "./Submit";
import AddNewLink from "./AddNewLink";
import { Avatar } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";

type Props = {
  user: UserType;
};
const UserRow = ({ user }: Props) => {
  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-[10px]">
          <Avatar
            src={user?.avatar}
            fallback={user.username}
            showFallback
            isBordered
            color="primary"
          />
          <span>{user.username}</span>
        </div>
      </td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">{user.createdAt?.toLocaleDateString()}</td>
      <td className="p-3">{user.isAdmin ? "Admin" : "Not Admin"}</td>
      <td className="p-3">
        <div className="flex items-center gap-[20px]">
          <MyToolTip content="view user details">
            <AddNewLink
              text="View"
              style="bg-primary  border-none text-white-text"
              href={`/dashboard/users/${user.id}`}
            />
          </MyToolTip>
          <form
            action={async () => {
              "use server";
              await deleteUser(user.id);
            }}
          >
            <Submit
              style="bg-red-500 text-white-text border-none "
              text="Delete"
              tooltipContent="Delete this user"
            />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default UserRow;
