"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
  title: string;
  path: string;
  style: string;
  activeStyle?: string;
};
const NavLink = ({
  path,
  title,
  style,
  activeStyle = "text-red-500",
}: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={`font-bold ${
        pathname === (path.slice(0, 5) === "/shop" ? "/shop" : path)
          ? activeStyle
          : ""
      } ${style} transition hover:text-red-500`}
    >
      {title}
    </Link>
  );
};
export default NavLink;
