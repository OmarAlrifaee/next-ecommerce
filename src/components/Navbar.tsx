import { UserType } from "@/types";
import NavLink from "./NavLink";
import { cookies } from "next/headers";
import { getCurrentUser, logout } from "@/actions/users";
import Submit from "./Submit";
import { IoLogOut } from "react-icons/io5";
import { Avatar, Button } from "@nextui-org/react";
import { HiLogin } from "react-icons/hi";
import Link from "next/link";
import MyToolTip from "./shared/MyToolTip";
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
  let currentUser: UserType | null = null; // to prevent a prerendering error
  if (cookies().get("token")?.value) {
    currentUser = await getCurrentUser();
  }
  return (
    <nav className="h-10 py-10 px-10 md:flex hidden items-center justify-between text-black">
      <div className="font-bold text-navlink">Logo</div>
      <ul className="flex items-center gap-3">
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
          <p className="font-bold text-navlink">{currentUser?.username}</p>
          <Avatar
            showFallback
            src={currentUser?.avatar}
            name={currentUser?.username}
            isBordered={!!currentUser?.avatar}
            color="primary"
            className="flex-shrink-0"
          />
          <form action={logout}>
            <Submit
              style="transition text-navlink hover:text-primary"
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
        <MyToolTip content="login">
          <Button as={Link} href="/login" variant="ghost">
            <HiLogin className="text-3xl text-navlink" />
          </Button>
        </MyToolTip>
      )}
    </nav>
  );
};
export default Navbar;
