import { MdSupervisedUserCircle, MdShoppingBag, MdHome } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import TopBarLink from "./TopBarLink";
import { MdOutlineCategory } from "react-icons/md";
const TopBar = () => {
  const menuItems = {
    title: "Pages",
    list: [
      {
        path: "/",
        icon: <MdHome className="xl:text-lg text-3xl" />,
      },
      {
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle className="xl:text-lg text-3xl" />,
      },
      {
        path: "/dashboard/products",
        icon: <MdShoppingBag className="xl:text-lg text-3xl" />,
      },
      {
        path: "/dashboard/categories",
        icon: <MdOutlineCategory className="xl:text-lg text-3xl" />,
      },
      {
        path: "/dashboard/carts",
        icon: <FaCartShopping className="xl:text-lg text-3xl" />,
      },
    ],
  };
  return (
    <ul className="py-5 flex items-center justify-center gap-5 xl:hidden w-full bg-main-soft-bg">
      {menuItems.list.map((menuLink) => (
        <li key={menuLink.path}>
          <TopBarLink menuLink={menuLink} />
        </li>
      ))}
    </ul>
  );
};
export default TopBar;
