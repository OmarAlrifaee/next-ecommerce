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
    path: "/shop",
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
  console.log(currentUser);
  return (
    <nav className="h-10 py-10 px-10 flex items-center justify-between">
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
          <div>
            <Image
              src={currentUser?.avatar || "/noavatar.jpg"}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <form action={logout}>
            <Submit>
              <IoLogOut width={40} height={40} radius={"50%"} />
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
