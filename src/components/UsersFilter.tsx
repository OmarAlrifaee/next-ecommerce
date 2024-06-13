"use client";

import { getAllUsers } from "@/actions/users";
import { UserType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UsersFilter = () => {
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
    replace(`${pathname}?${params}`);
  };
  return (
    <select
      onChange={(e) => hundleChange(e.target.value)}
      defaultValue={"all"}
      className="text-black outline-none focus:outline-none p-2 rounded-md"
    >
      <option value="none">none</option>
      {users?.map((user) => (
        <option
          value={user.username}
          key={user.id}
          selected={searchParams.get("user")! === user.username}
          className="capitalize"
        >
          {user.username}
        </option>
      ))}
    </select>
  );
};
export default UsersFilter;
