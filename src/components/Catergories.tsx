"use client";

import { getAllCategories } from "@/actions/categories";
import { CategoryType } from "@/types";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type Props = {
  style?: string;
  dashboard?: boolean;
};
const Catergories = ({ style, dashboard }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getAllCategories();
      setCategories(data);
    })();
  }, []);
  const hundleChange = (categoryValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryValue !== "all") {
      params.set("category", categoryValue);
    } else params.delete("category");
    replace(`${pathname}?${params}`, { scroll: false });
  };
  return (
    <Select
      onChange={(e) => hundleChange(e.target.value)}
      className="sm:max-w-[300px] w-full"
      defaultSelectedKeys={[searchParams.get("category")! || "all"]}
      radius="md"
    >
      <SelectItem key={"all"}>All</SelectItem>
      {categories.map((category) => (
        <SelectItem key={category.title}>{category.title}</SelectItem>
      ))}
    </Select>
  );
};
export default Catergories;
