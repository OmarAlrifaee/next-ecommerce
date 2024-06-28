"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
type Props = {
  style?: string;
};
const Search = ({ style }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get("page")) {
      params.set("page", "1");
      replace(`${pathname}?${params}`);
    }
  }, []);
  const hundleChange = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    params.delete("category");
    replace(`${pathname}?${params}`);
  };
  return (
    <input
      type="text"
      onChange={(e) => hundleChange(e.target.value)}
      placeholder="Search..."
      className={`border-none outline-none focus:outline-none rounded-md px-5 py-2 text-black font-bold ${style}`}
    />
  );
};
export default Search;
