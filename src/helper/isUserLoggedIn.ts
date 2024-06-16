import { cookies } from "next/headers";

export const isUserLoggedIn = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return token ? true : false;
};