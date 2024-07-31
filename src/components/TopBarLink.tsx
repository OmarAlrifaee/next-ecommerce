"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  menuLink: { path: string; icon: JSX.Element; title: string };
};
const BottomBarLink = ({ menuLink }: Props) => {
  const pathname = usePathname();
  return (
    <MyToolTip content={`go to ${menuLink.title}`}>
      <Link
        href={menuLink.path}
        className={`${
          pathname === menuLink.path ? "text-black-text" : "text-gray-text"
        } transition hover:text-black-text`}
      >
        {menuLink.icon}
      </Link>
    </MyToolTip>
  );
};
export default BottomBarLink;
