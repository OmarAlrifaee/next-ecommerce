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
  activeStyle = "border-b-2 border-b-red-500",
}: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={`${pathname === path ? activeStyle : ""} ${style} transition`}
    >
      {title}
    </Link>
  );
};
export default NavLink;
