import { MdSupervisedUserCircle, MdShoppingBag, MdHome } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import TopBarLink from "./TopBarLink";
import { MdOutlineCategory } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
const TopBar = () => {
  const menuItems = {
    title: "Pages",
    list: [
      {
        title: "Home",
        path: "/",
        icon: <MdHome className="xl:text-lg text-3xl" />,
      },
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
        title: "Carts",
        path: "/dashboard/carts",
        icon: <FaCartShopping className="xl:text-lg text-3xl" />,
      },
      {
        title: "Orders",
        path: "/dashboard/orders",
        icon: <FaHandHoldingUsd className="xl:text-lg text-3xl" />,
      },
    ],
  };
  return (
    <ul className="py-5 flex items-center justify-between px-5 gap-5 xl:hidden w-full bg-main-soft-bg">
      {menuItems.list.map((menuLink) => (
        <li key={menuLink.path}>
          <TopBarLink menuLink={menuLink} />
        </li>
      ))}
    </ul>
  );
};
export default TopBar;
