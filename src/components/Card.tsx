type Props = {
  children: React.ReactNode;
};
const Card = ({ children }: Props) => {
  return (
    <div className="bg-main-soft-bg rounded-md p-5 flex items-center justify-center flex-col gap-5">
      {children}
    </div>
  );
};
export default Card;
