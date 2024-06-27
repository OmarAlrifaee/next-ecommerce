import { UserType } from "@/types";
import NavLink from "./NavLink";
import { cookies } from "next/headers";
import { getCurrentUser, logout } from "@/actions/users";
import Image from "next/image";
import Submit from "./Submit";
import { IoLogOut } from "react-icons/io5";
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
    <nav className="h-10 py-10 px-10 md:flex hidden items-center justify-between text-white ">
      <div>Logo</div>
      <ul className="flex items-center gap-3">
        {links.map((link) => (
          <NavLink
            path={link.path}
            title={link.title}
            style=""
            key={link.path}
          />
        ))}
        {!currentUser ? (
          <NavLink path="/login" title="Login" style="" activeStyle="" />
        ) : (
          ""
        )}
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
        <div className="flex items-center gap-3">
          <p>{currentUser?.username}</p>
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
