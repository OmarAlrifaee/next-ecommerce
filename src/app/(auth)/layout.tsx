type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return <section>{children}</section>;
};
export default layout;