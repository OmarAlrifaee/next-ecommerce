"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MyToolTip from "./shared/MyToolTip";
type Props = {
  menuItem: {
    icon: React.ReactNode;
    title: string;
    path: string;
  };
};
const SidebarLink = ({ menuItem: { icon, path, title } }: Props) => {
  const pathname = usePathname();
  return (
    <MyToolTip content={`go to ${title} page`}>
      <Link
        href={path}
        className={`p-[10px] flex items-center font-semibold gap-[10px] transition hover:bg-primary hover:text-white-text my-[5px] rounded-md ${
          pathname === path ? "bg-primary text-white-text" : ""
        }`}
      >
        {icon}
        {title}
      </Link>
    </MyToolTip>
  );
};
export default SidebarLink;
