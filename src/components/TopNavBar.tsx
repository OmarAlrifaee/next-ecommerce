import { UserType } from "@/types";
import { cookies } from "next/headers";
import { getCurrentUser, logout } from "@/actions/users";
import Image from "next/image";
import Submit from "./Submit";
import { IoLogOut } from "react-icons/io5";
import TopNavBarLink from "./TopNavBarLink";
import { MdHome } from "react-icons/md";
import { MdShop } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { HiLogin } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { Avatar } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";
const links = [
  {
    path: "/",
    icon: <MdHome className="text-3xl" />,
  },
  {
    path: "/shop?page=1",
    icon: <MdShop className="text-3xl" />,
  },
  {
    path: "/cart",
    icon: <MdShoppingCart className="text-3xl" />,
  },
];
const Navbar = async () => {
  let currentUser: UserType | null = null; // to prevent a prerendering error
  if (cookies().get("token")?.value) {
    currentUser = await getCurrentUser();
  }
  return (
    <nav className="p-5 flex items-center sm:justify-between justify-center sm:flex-nowrap flex-wrap gap-10 md:hidden text-black bg-main-soft-bg">
      {currentUser ? (
        <div className="flex items-center justify-between w-full">
          <Avatar
            // as={Image}
            showFallback
            src={currentUser?.avatar}
            name={currentUser?.username}
            isBordered={!!currentUser?.avatar}
            color="primary"
            radius="full"
          />
          <form action={logout}>
            <Submit
              style="text-navlink hover:text-primary p-0"
              tooltipContent="logout"
            >
              <IoLogOut
                width={40}
                height={40}
                radius={"50%"}
                className="text-3xl"
              />
            </Submit>
          </form>
        </div>
      ) : (
        ""
      )}
      <ul className="flex items-center justify-between w-full">
        {links.map((link) => (
          <TopNavBarLink key={link.path} link={link} />
        ))}
        {!currentUser ? (
          <TopNavBarLink
            link={{
              path: "/login",
              icon: <HiLogin className="text-3xl" />,
            }}
          />
        ) : (
          ""
        )}
        {currentUser?.isAdmin ? (
          <TopNavBarLink
            link={{
              path: "/dashboard/users",
              icon: <MdDashboardCustomize className="text-3xl" />,
            }}
          />
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
