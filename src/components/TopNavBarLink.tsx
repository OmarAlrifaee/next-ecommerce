"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  link: {
    path: string;
    icon: JSX.Element;
    title: string;
  };
};
const TopNavBarLink = ({ link }: Props) => {
  const pathname = usePathname();
  return (
    <MyToolTip content={link.title}>
      <Link
        href={link.path}
        className={`${
          pathname === (link.path.slice(0, 5) === "/shop" ? "/shop" : link.path)
            ? "text-black-text"
            : "text-gray-text"
        } transition hover:text-black-text`}
      >
        {link.icon}
      </Link>
    </MyToolTip>
  );
};
export default TopNavBarLink;
