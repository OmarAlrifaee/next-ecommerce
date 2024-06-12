"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <Link
      href={path}
      className={`p-[10px] flex items-center gap-[10px] hover:bg-[#2e374a] my-[5px] rounded-md ${
        pathname === path ? "bg-[#2e374a]" : ""
      }`}
    >
      {icon}
      {title}
    </Link>
  );
};
export default SidebarLink;
