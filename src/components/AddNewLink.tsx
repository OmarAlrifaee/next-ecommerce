import { Button } from "@nextui-org/react";
import Link from "next/link";

type Props = {
  href: string;
  text: string;
  style?: string;
};
const AddNewLink = ({ href, text, style }: Props) => {
  return (
    <Button
      className={`${style}  font-bold`}
      variant="ghost"
      radius="md"
      as={Link}
      href={href}
    >
      {text}
    </Button>
  );
};
export default AddNewLink;
