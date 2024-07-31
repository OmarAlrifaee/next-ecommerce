"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
type Props = {
  desc: string;
};
const ProductDetailsDescription = ({ desc }: Props) => {
  return (
    <Accordion className="p-0" defaultExpandedKeys={"1"}>
      <AccordionItem
        key={"1"}
        title={<p className="text-2xl font-semibold">Description</p>}
        subtitle="Press To Show Or Hide Description"
        indicator={<IoIosArrowBack className="text-2xl text-black-text" />}
      >
        <p className="text-black-text">{desc}</p>
      </AccordionItem>
    </Accordion>
  );
};
export default ProductDetailsDescription;
