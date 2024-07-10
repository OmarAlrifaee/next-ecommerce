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
      className={`p-[10px] flex items-center font-semibold gap-[10px] transition hover:bg-[#f1f1f1] my-[5px] rounded-md ${
        pathname === path ? "bg-[#f1f1f1] text-green-500" : ""
      }`}
    >
      {icon}
      {title}
    </Link>
  );
};
export default SidebarLink;
