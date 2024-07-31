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
  activeStyle = "text-black-text border-b-2 border-b-black-text",
}: Props) => {
  const pathname = usePathname();
  return (
    <MyToolTip content={title}>
      <Link
        href={path}
        className={`text-lg pb-1 font-semibold ${
          pathname === (path.slice(0, 5) === "/shop" ? "/shop" : path)
            ? activeStyle
            : "text-gray-text"
        } ${style} transition hover:text-black-text  hover:border-b-2 hover:border-b-black-text`}
      >
        {title}
      </Link>
    </MyToolTip>
  );
};
export default NavLink;
