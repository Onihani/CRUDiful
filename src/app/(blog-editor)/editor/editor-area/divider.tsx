// react
import { FC } from "react";

// types
type DividerProps = {
  id: string;
};

const Divider: FC<DividerProps> = () => {
  return <hr className="border-black/20 mb-8" />;
};

export default Divider;