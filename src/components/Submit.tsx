"use client";
import { useFormStatus } from "react-dom";
import Loader from "./Loader";

type Props = {
  text?: string;
  style?: string;
};
const Submit = ({ text = "submit", style }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${style} border-none rounded-md transition px-4 py-2 font-semibold`}
    >
      {pending ? <Loader size="5" /> : text}
    </button>
  );
};
export default Submit;
