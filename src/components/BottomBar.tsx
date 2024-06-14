import { MdSupervisedUserCircle, MdShoppingBag } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import BottomBarLink from "./BottomBarLink";
import { MdOutlineCategory } from "react-icons/md";
const BottomBar = () => {
  const menuItems = {
    title: "Pages",
    list: [
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle className="xl:text-lg text-3xl" />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag className="xl:text-lg text-3xl" />,
      },
      {
        title: "Categories",
        path: "/dashboard/categories",
        icon: <MdOutlineCategory className="xl:text-lg text-3xl" />,
      },
      {
        title: "carts",
        path: "/dashboard/carts",
        icon: <FaCartShopping className="xl:text-lg text-3xl" />,
      },
    ],
  };
  return (
    <ul className="py-5 flex items-center justify-center gap-5 xl:hidden w-full bg-main-soft-bg">
      {menuItems.list.map((menuLink) => (
        <li key={menuLink.path}>
          <BottomBarLink menuLink={menuLink} />
        </li>
      ))}
    </ul>
  );
};
export default BottomBar;
