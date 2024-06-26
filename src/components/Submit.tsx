"use client";
import { useFormStatus } from "react-dom";
import Loader from "./Loader";

type Props = {
  text?: string;
  style?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};
const Submit = ({ text, style, children, disabled }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`${style} border-none rounded-md transition px-4 py-2 font-semibold`}
    >
      {pending ? <Loader /> : text || children}
    </button>
  );
};
export default Submit;
