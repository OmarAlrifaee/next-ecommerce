import Image from "next/image";
import SidebarLink from "./SideBarLink";
import { MdSupervisedUserCircle, MdShoppingBag } from "react-icons/md";
import { UserType } from "@/types";
type Props = {
  currentUser: UserType;
};
const Sidebar = async ({ currentUser }: Props) => {
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
          src={currentUser.avatar || "/noavatar.jpg"}
          alt={currentUser.username + "image"}
          width={"50"}
          height={"50"}
          className="object-cover rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-[500]">{currentUser.username}</span>
          <span className="text-[12px] text-soft-text">Admin</span>
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
