// react
import { FC } from "react";
// next
import Image from "next/image";

// static assets
import captionSvg from "public/images/caption.svg";

// types
type CaptionButtonProps = {
  onClick: () => void;
};

const CaptionButton: FC<CaptionButtonProps> = ({ onClick }) => {
  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={onClick}
        className="bg-[#f4f4f4] py-2 px-3 text-[#666666] text-[17px] flex items-center justify-center gap-2 rounded"
      >
        <Image src={captionSvg} alt="caption icon" />
        <span>Add an Image caption</span>
      </button>
    </div>
  );
};

export default CaptionButton;