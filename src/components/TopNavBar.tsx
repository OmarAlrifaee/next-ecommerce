import { UserType } from "@/types";
import NavLink from "./NavLink";
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
    <nav className="p-10 flex items-center sm:justify-between justify-center sm:flex-nowrap flex-wrap gap-10 md:hidden text-white bg-main-soft-bg">
      <ul className="flex items-center gap-3">
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
      {currentUser ? (
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] overflow-hidden rounded-full relative">
            <Image src={currentUser?.avatar || "/noavatar.jpg"} alt="" fill />
          </div>
          <form action={logout}>
            <Submit style="transition hover:text-red-500">
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
    </nav>
  );
};
export default Navbar;
