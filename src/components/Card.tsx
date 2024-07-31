type Props = {
  children: React.ReactNode;
  fixed?: boolean;
};
const Card = ({ children, fixed }: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`bg-main-bg border-1 rounded-md shadow-sm mt-10 p-5 flex items-center justify-center overflow-hidden flex-col gap-5 text-black-text ${
          fixed
            ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default Card;
