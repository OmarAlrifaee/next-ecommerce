"use client";
import itemPerPage from "@/helper/itemPerPage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type Props = {
  count: number;
};
const Pagenation = ({ count }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const showPrev = itemPerPage * (+searchParams.get("page")! - 1) > 0;
  const showNext =
    itemPerPage * (+searchParams.get("page")! - 1) + itemPerPage < count;
  // functions
  const goNext = () => {
    const params = new URLSearchParams(searchParams);
    if (showNext) {
      params.set("page", (+params.get("page")! + 1).toString());
      replace(`${pathname}?${params}`);
    }
  };
  const goPrev = () => {
    const params = new URLSearchParams(searchParams);
    if (showPrev) {
      params.set("page", (+params.get("page")! - 1).toString());
      replace(`${pathname}?${params}`);
    }
  };
  return (
    <div className="flex items-center justify-between p-[10px] mt-5">
      <button
        className="cursor-pointer disabled:cursor-not-allowed disabled:bg-[#ffffff77] px-[10px] py-[5px] rounded-sm bg-white  text-black"
        onClick={goPrev}
        disabled={!showPrev}
      >
        Prev
      </button>
      <button
        className="cursor-pointer disabled:cursor-not-allowed disabled:bg-[#ffffff77] px-[10px] py-[5px] rounded-sm bg-white  text-black"
        onClick={goNext}
        disabled={!showNext}
      >
        Next
      </button>
    </div>
  );
};
export default Pagenation;
