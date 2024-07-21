// react
import { FC, useState } from "react";
// imports
import { Trash2 } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";

// helpers
import { classnames } from "@/common/helpers";

// types
type DividerProps = {
  itemId: string;
  onDelete: (id: string) => void;
};

const Divider: FC<DividerProps> = ({ itemId, onDelete: onItemDelete }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      className={classnames("w-full", {
        "grid grid-cols-[1fr_auto] items-center gap-1.5": isFocused,
      })}
    >
      <div
        tabIndex={1}
        className="py-8"
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // delay to allow the delete button to be clicked
          setTimeout(() => setIsFocused(false), 200);
        }}
      >
        <hr className="border-black/20 hover:cursor-wait" />
      </div>
      {isFocused && (
        <Button
          size="icon"
          onClick={() => onItemDelete(itemId)}
          className="bg-[#FFE2E2] hover:bg-[#FFE2E2] hover:brightness-75 py-2 px-3 rounded"
        >
          <Trash2 size={20} color="#AB0000" />
        </Button>
      )}
    </div>
  );
};

export default Divider;
