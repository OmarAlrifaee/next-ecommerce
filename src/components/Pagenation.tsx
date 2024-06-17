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
  // test
  const numbers: number[] = [];
  for (let i = 1; i <= count / itemPerPage; i++) {
    numbers.push(i);
  }
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
  const hundleClick = (num: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", num.toString());
    replace(`${pathname}?${params}`);
  };
  return (
    <div className="flex items-center justify-between p-[10px] mt-5">
      <button
        className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 px-[10px] py-[5px] rounded-md bg-primary transition hover:bg-blue-200  text-white font-semibold"
        onClick={goPrev}
        disabled={!showPrev}
      >
        Prev
      </button>
      <div className="flex items-center gap-5">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => hundleClick(num)}
            className={`text-white rounded-md p-3 font-bold size-8 flex items-center justify-center ${
              parseInt(searchParams.get("page")!) === num
                ? "bg-primary"
                : "bg-blue-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 px-[10px] py-[5px] rounded-md bg-primary transition hover:bg-blue-200  text-white font-semibold"
        onClick={goNext}
        disabled={!showNext}
      >
        Next
      </button>
    </div>
  );
};
export default Pagenation;
