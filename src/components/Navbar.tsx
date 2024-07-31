import { UserType } from "@/types";
import NavLink from "./NavLink";
import { getCurrentUser, logout } from "@/actions/users";
import Submit from "./Submit";
import { IoLogOut } from "react-icons/io5";
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import MyToolTip from "./shared/MyToolTip";
import { isUserLoggedIn } from "@/helper/isUserLoggedIn";
import { HiOutlineLogin } from "react-icons/hi";
const links = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/shop?page=1",
    title: "Shop",
  },
  {
    path: "/cart",
    title: "Cart",
  },
];
const Navbar = async () => {
  const isLoggedIn = isUserLoggedIn();
  const currentUser: UserType | null = isLoggedIn
    ? await getCurrentUser()
    : null; // to prevent a prerendering error
  return (
    <nav className="h-10 p-10 md:flex hidden items-center justify-between text-black border-b-1">
      <div className="font-bold text-black-text text-3xl">Exclusive</div>
      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <NavLink
            path={link.path}
            title={link.title}
            style=""
            key={link.path}
          />
        ))}

        {currentUser?.isAdmin ? (
          <NavLink
            path="/dashboard/users"
            title="Dashboard"
            style=""
            activeStyle=""
          />
        ) : (
          ""
        )}
      </ul>
      {currentUser ? (
        <div className="flex items-center gap-5">
          <p className="text-black-text text-lg capitalize font-semibold">
            {currentUser?.username}
          </p>
          <Avatar
            showFallback
            src={currentUser?.avatar}
            name={currentUser?.username}
            isBordered={!!currentUser?.avatar}
            color="secondary"
            className="flex-shrink-0"
          />
          <form action={logout}>
            <Submit
              style="border border-gray-text bg-white-text rounded-full"
              tooltipContent="logout"
              icon
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
        <MyToolTip content="login">
          <Button
            as={Link}
            href="/login"
            className="border border-gray-text bg-white-text rounded-full"
            isIconOnly
          >
            <HiOutlineLogin className="text-3xl text-black-text" />
          </Button>
        </MyToolTip>
      )}
    </nav>
  );
};
export default Navbar;
