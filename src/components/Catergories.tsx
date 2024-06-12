"use client";

import { getAllCategories } from "@/actions/categories";
import { CategoryType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Catergories = () => {
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
    >
      <option value={"all"}>All</option>
      {categories.map((category) => (
        <option
          value={category.title}
          key={category.title}
          className="capitalize"
        >
          {category.title}
        </option>
      ))}
    </select>
  );
};
export default Catergories;
