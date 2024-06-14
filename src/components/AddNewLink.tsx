import Link from "next/link";

type Props = {
  href: string;
  text: string;
  style?: string;
};
const AddNewLink = ({ href, text, style }: Props) => {
  return (
    <Link
      href={href}
      className={`bg-primary transition hover:bg-blue-200 font-semibold rounded-md px-5 py-2 text-white ${style}`}
    >
      {text}
    </Link>
  );
};
export default AddNewLink;
