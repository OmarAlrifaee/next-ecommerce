"use client";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
type Props = {
  isAdmin: boolean;
};
const MyCustomSwitch = ({ isAdmin }: Props) => {
  const [value, setValue] = useState(isAdmin || false);
  console.log(value);
  return (
    <>
      <input type="hidden" name="isAdmin" value={value ? "on" : ""} />
      <Switch onValueChange={setValue} isSelected={value} />
    </>
  );
};
export default MyCustomSwitch;
