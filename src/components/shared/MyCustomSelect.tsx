"use client";
import { CategoryType } from "@/types";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

type Props = {
  categories: CategoryType[];
  currentProductCategory?: string;
  isRequired?: boolean;
};
const MyCustomSelect = ({
  categories,
  currentProductCategory,
  isRequired,
}: Props) => {
  const [value, setValue] = useState(currentProductCategory || "");
  return (
    <>
      <input type="hidden" name="category" value={value} />
      <Select
        onChange={(e) => setValue(e.target.value)}
        selectedKeys={[value]}
        label="Category"
        className="font-bold"
        variant="underlined"
        isRequired={isRequired || false}
      >
        {categories.map((cat) => (
          <SelectItem key={cat.title}>{cat.title}</SelectItem>
        ))}
      </Select>
    </>
  );
};
export default MyCustomSelect;
