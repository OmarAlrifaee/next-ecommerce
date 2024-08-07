"use client";

import { Input } from "@nextui-org/react";
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
      replace(`${pathname}?${params}`, {
        scroll: false,
      });
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
    replace(`${pathname}?${params}`, {
      scroll: false,
    });
  };
  return (
    <Input
      type="text"
      onChange={(e) => hundleChange(e.target.value)}
      placeholder="Search"
      className={`md:w-[300px] w-full flex-shrink-0 font-bold ${style}`}
    />
  );
};
export default Search;
