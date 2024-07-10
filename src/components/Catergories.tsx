"use client";

import { getAllCategories } from "@/actions/categories";
import { CategoryType } from "@/types";
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
    replace(`${pathname}?${params}`);
  };
  return (
    <select
      onChange={(e) => hundleChange(e.target.value)}
      defaultValue={searchParams.get("category")!}
      className={`text-black outline-none focus:outline-none p-2 rounded-md ${style} ${
        dashboard ? "bg-main-bg" : ""
      }`}
    >
      <option value={"all"}>All</option>
      {categories.map((category) => (
        <option
          value={category.title}
          key={category.title}
          className="capitalize"
          selected={searchParams.get("category")! === category.title}
        >
          {category.title}
        </option>
      ))}
    </select>
  );
};
export default Catergories;
