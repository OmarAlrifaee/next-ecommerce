"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  title: string;
  path: string;
  style?: string;
  activeStyle?: string;
};
const NavLink = ({
  path,
  title,
  style,
  activeStyle = "text-primary",
}: Props) => {
  const pathname = usePathname();
  return (
    <MyToolTip content={title}>
      <Link
        href={path}
        className={`font-bold ${
          pathname === (path.slice(0, 5) === "/shop" ? "/shop" : path)
            ? activeStyle
            : "text-navlink"
        } ${style} transition  hover:text-primary`}
      >
        {title}
      </Link>
    </MyToolTip>
  );
};
export default NavLink;
