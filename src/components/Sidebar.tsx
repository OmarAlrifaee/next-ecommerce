import Image from "next/image";
import SidebarLink from "./SideBarLink";
import { MdSupervisedUserCircle, MdShoppingBag, MdHome } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { UserType } from "@/types";
import { Avatar } from "@nextui-org/react";
type Props = {
  currentUser: UserType;
};
const Sidebar = async ({ currentUser }: Props) => {
  const menuItems = {
    title: "Pages",
    list: [
      {
        title: "Go Home",
        path: "/",
        icon: <MdHome />,
      },
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
        icon: <MdOutlineCategory />,
      },
      {
        title: "carts",
        path: "/dashboard/carts",
        icon: <FaCartShopping />,
      },
      {
        title: "orders",
        path: "/dashboard/orders",
        icon: <FaHandHoldingUsd />,
      },
    ],
  };
  return (
    <section className="flex-1 bg-main-bg border-r-1 p-5 xl:block hidden">
      <div className="flex items-center gap-[20px] mt-[20px]">
        <Avatar
          showFallback
          src={currentUser?.avatar}
          name={currentUser?.username}
          isBordered={!!currentUser?.avatar}
          color="secondary"
        />
        <div className="flex flex-col">
          <span className="font-[500] text-black-text capitalize">
            {currentUser.username}
          </span>
          <span className="text-[12px]">Admin</span>
        </div>
      </div>
      <ul className="mt-5">
        <li>
          <span className=" font-bold text-[13px] my-[10px] text-gray-text">
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
