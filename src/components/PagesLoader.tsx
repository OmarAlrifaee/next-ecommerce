import { Spinner, useSpinner } from "@nextui-org/react";
import { forwardRef } from "react";
const PagesLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner color="white" size="lg" />
    </div>
  );
};
export default PagesLoader;