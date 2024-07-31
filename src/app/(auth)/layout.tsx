import Image from "next/image";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  
  return (
    <section className="flex items-center justify-between h-screen p-10">
      <div className="flex-[2] md:block hidden relative z-10 h-[80%] rounded-md overflow-hidden">
        <Image src={"/dl.beatsnoop.png"} alt="iphone photo" fill />
      </div>
      {children}
    </section>
  );
};
export default layout;
