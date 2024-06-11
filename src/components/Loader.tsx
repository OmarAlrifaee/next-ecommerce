type Props = {
  size: string;
};
const Loader = ({ size }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`border-y-2 border-y-black animate-spin rounded-full size-${size}`} />
    </div>
  );
};
export default Loader;
