import { Tooltip } from "@nextui-org/react";
const MyToolTip = ({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip
      content={content}
      className="capitalize font-semibold"
      color="default"
      placement="bottom"
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
export default MyToolTip;
