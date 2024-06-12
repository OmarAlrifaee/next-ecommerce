import Link from "next/link";

type Props = {
  href: string;
  text: string;
};
const AddNewLink = ({ href, text }: Props) => {
  return (
    <Link href={href} className="bg-primary font-semibold rounded-md px-5 py-2">
      {text}
    </Link>
  );
};
export default AddNewLink;
