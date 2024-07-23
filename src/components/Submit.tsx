"use client";
import { useFormStatus } from "react-dom";
import Loader from "./Loader";
import { Button } from "@nextui-org/react";
import MyToolTip from "./shared/MyToolTip";

type Props = {
  text?: string;
  style?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  tooltipContent?: string;
};
const Submit = ({
  text,
  style,
  children,
  disabled,
  tooltipContent = "submit",
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <MyToolTip content={tooltipContent}>
      <Button
        type="submit"
        isDisabled={pending || disabled}
        className={`${style} font-bold`}
        variant="ghost"
      >
        {pending ? <Loader /> : text || children}
      </Button>
    </MyToolTip>
  );
};
export default Submit;
