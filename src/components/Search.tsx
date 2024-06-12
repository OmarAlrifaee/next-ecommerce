"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Search = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    replace(`${pathname}?${params}`);
  }, []);
  const hundleChange = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
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
      className="border-none outline-none focus:outline-none rounded-md px-5 py-2 text-black font-bold"
    />
  );
};
export default Search;