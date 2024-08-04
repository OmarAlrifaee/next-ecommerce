import { Spinner } from "@nextui-org/react";
const PagesLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner color="default" size="lg" />
    </div>
  );
};
export default PagesLoader;