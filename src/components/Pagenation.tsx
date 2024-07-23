"use client";
import itemPerPage from "@/helper/itemPerPage";
import { Button } from "@nextui-org/react";
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
  // add pagination buttons debeds on product count i used the math.ceil to make sure if there for example 21 products / 5 itemperpage it will be like 4.somthing and using ceil it will be 5
  const numbers: number[] = [];
  for (let i = 1; i <= Math.ceil(count / itemPerPage); i++) {
    numbers.push(i);
  }
  // functions
  const goNext = () => {
    const params = new URLSearchParams(searchParams);
    if (showNext) {
      params.set("page", (+params.get("page")! + 1).toString());
      replace(`${pathname}?${params}`, {
        scroll: false,
      });
    }
  };
  const goPrev = () => {
    const params = new URLSearchParams(searchParams);
    if (showPrev) {
      params.set("page", (+params.get("page")! - 1).toString());
      replace(`${pathname}?${params}`, {
        scroll: false,
      });
    }
  };
  const hundleClick = (num: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", num.toString());
    replace(`${pathname}?${params}`, {
      scroll: false,
    });
  };
  return (
    <div className="flex items-center justify-between p-[10px] mt-5 gap-5">
      <Button
        className="disabled:cursor-not-allowed bg-primary text-white-text font-bold"
        onClick={goPrev}
        isDisabled={!showPrev}
        radius="md"
      >
        Prev
      </Button>
      <div className="flex items-center gap-5 flex-wrap">
        {numbers.map((num) => (
          <Button
            key={num}
            onClick={() => hundleClick(num)}
            className={`disabled:cursor-not-allowed bg-primary text-white-text font-bold ${
              parseInt(searchParams.get("page")!) === num
                ? "bg-primary"
                : "bg-blue-200"
            }`}
            isIconOnly
            radius="md"
          >
            {num}
          </Button>
        ))}
      </div>
      <Button
        className="disabled:cursor-not-allowed bg-primary text-white-text font-bold"
        onClick={goNext}
        isDisabled={!showNext}
        radius="md"
      >
        Next
      </Button>
    </div>
  );
};
export default Pagenation;
