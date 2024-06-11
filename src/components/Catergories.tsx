"use client";

import { CategoryType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: CategoryType[];
};
const Catergories = ({ categories }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
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
