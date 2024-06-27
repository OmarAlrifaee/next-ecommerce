"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
  link: {
    path: string;
    icon: JSX.Element;
  };
};
const TopNavBarLink = ({ link }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={link.path}
      className={`${
        pathname === (link.path.slice(0, 5) === "/shop" ? "/shop" : link.path)
          ? "text-green-500"
          : ""
      } transition hover:text-green-500`}
    >
      {link.icon}
    </Link>
  );
};
export default TopNavBarLink;
