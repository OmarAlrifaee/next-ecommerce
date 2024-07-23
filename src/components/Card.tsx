type Props = {
  children: React.ReactNode;
  fixed?: boolean;
};
const Card = ({ children, fixed }: Props) => {
  return (
    <div
      className={`bg-main-bg rounded-md mt-10 p-5 flex items-center justify-center flex-col gap-5 ${
        fixed
          ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 shadow-md"
          : ""
      }`}
    >
      {children}
    </div>
  );
};
export default Card;
