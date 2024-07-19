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
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// fonts
import { geist } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type ParagraphProps = {
  itemId: string;
  value?: string | null;
  onChange: (id: string, text: string | null) => void;
};

const Paragraph: FC<ParagraphProps> = ({
  itemId,
  value,
  onChange: onInputChange,
}) => {
  // refs
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState<string>("");

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
    <ContentEditable
      innerRef={ref}
      html={text}
      onChange={handleInput}
      data-placeholder="Start your paragraph here.."
      className={classnames("paragraph", geist.className)}
      tagName="p"
    />
  );
};

export default memo(Paragraph);
