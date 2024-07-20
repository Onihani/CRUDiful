// react
import { FC } from "react";

// types
type DividerProps = {
  itemId: string;
};

const Divider: FC<DividerProps> = ({ itemId }) => {
  return <hr className="border-black/20 my-10" />;
};

export default Divider;
