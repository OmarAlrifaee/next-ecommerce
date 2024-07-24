"use client";

import { getAllUsers } from "@/actions/users";
import { UserType } from "@/types";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type Props = {
  style?: string;
};
const UsersFilter = ({ style }: Props) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    (async () => {
      const { users } = await getAllUsers();
      setUsers(users);
    })();
  }, [searchParams]);
  const hundleChange = (userName: string) => {
    const params = new URLSearchParams(searchParams);
    if (userName !== "none") {
      params.set("user", userName);
    } else params.delete("user");
    replace(`${pathname}?${params}`, {
      scroll: false,
    });
  };
  return (
    <Select
      onChange={(e) => hundleChange(e.target.value)}
      selectedKeys={[searchParams.get("user")! || "none"]}
      className="sm:max-w-[300px] w-full"
    >
      <SelectItem key={"none"}>none</SelectItem>
      {users?.map((user) => (
        <SelectItem key={user.username}>{user.username}</SelectItem>
      ))}
    </Select>
  );
};
export default UsersFilter;
