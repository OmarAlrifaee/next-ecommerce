import Image from "next/image";
import SidebarLink from "./SideBarLink";
import { MdSupervisedUserCircle, MdShoppingBag } from "react-icons/md";
import { getCurrentUser } from "@/actions/users";
import { UserType } from "@/types";
import { cookies } from "next/headers";

const Sidebar = async () => {
  // to prevent a preredering error cuz next will prefetch the currentUser but there is no token before login
  let user: UserType | null = null;
  if (cookies().get("token")?.value) {
    user = await getCurrentUser();
  }
  const menuItems = {
    title: "Pages",
    list: [
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Categories",
        path: "/dashboard/categories",
        icon: <MdShoppingBag />,
      },
      {
        title: "carts",
        path: "/dashboard/carts",
        icon: <MdShoppingBag />,
      },
    ],
  };
  return (
    <section className="flex-1 bg-main-soft-bg p-5 xl:block hidden">
      <div className="flex items-center gap-[20px] mt-[20px]">
        <Image
          src={user?.avatar || "/noavatar.jpg"}
          alt={user?.username + "image"}
          width={"50"}
          height={"50"}
          className="object-cover rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-[500]">{user?.username}</span>
          <span className="text-[12px] text-soft-text">
            {user?.isAdmin ? "admin" : "not admin"}
          </span>
        </div>
      </div>
      <ul className="mt-5">
        <li>
          <span className="text-soft-text font-bold text-[13px] my-[10px]">
            {menuItems.title}
          </span>
          <div className="mt-3">
            {menuItems.list.map((menuLink) => (
              <SidebarLink menuItem={menuLink} key={menuLink.title} />
            ))}
          </div>
        </li>
      </ul>
    </section>
  );
};
export default Sidebar;
