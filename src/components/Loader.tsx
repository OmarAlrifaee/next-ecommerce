type Props = {};
const Loader = ({}: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-y-2 border-y-black animate-spin rounded-full size-5`}
      />
    </div>
  );
};
export default Loader;