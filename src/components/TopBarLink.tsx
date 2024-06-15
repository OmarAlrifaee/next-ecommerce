"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
  menuLink: { path: string; icon: JSX.Element };
};
const BottomBarLink = ({ menuLink }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={menuLink.path}
      className={`${
        pathname === menuLink.path ? "text-green-500" : ""
      } transition hover:text-green-500`}
    >
      {menuLink.icon}
    </Link>
  );
};
export default BottomBarLink;
