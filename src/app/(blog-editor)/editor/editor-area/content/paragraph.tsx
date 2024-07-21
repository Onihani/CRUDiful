"use client";

// react
import {
  FC,
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
// imports
import { Trash2 } from "lucide-react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// ui components
import { Button } from "@/components/ui/button";

// fonts
import { geist } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type ParagraphProps = {
  itemId: string;
  value?: string | null;
  onChange: (id: string, text: string | null) => void;
  onDelete: (id: string) => void;
};

const Paragraph: FC<ParagraphProps> = ({
  itemId,
  value,
  onChange: onInputChange,
  onDelete: onItemDelete,
}) => {
  // refs
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // handers
  const handleInput = useCallback((event: ContentEditableEvent) => {
    const updatedText = event.target.value;
    setText(event.target.value);
    onInputChange(itemId, updatedText);
  }, []);

  useLayoutEffect(() => {
    if (value) setText(value);
  }, []);

  return (
    <div
      className={classnames("w-full", {
        "grid grid-cols-[1fr_auto] items-center gap-1.5": isFocused,
      })}
    >
      <ContentEditable
        innerRef={ref}
        html={text}
        onChange={handleInput}
        data-placeholder="Start your paragraph here.."
        className={classnames("paragraph", geist.className)}
        tagName="p"
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // delay to allow the delete button to be clicked
          setTimeout(() => setIsFocused(false), 200);
        }}
      />
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

export default memo(Paragraph);
