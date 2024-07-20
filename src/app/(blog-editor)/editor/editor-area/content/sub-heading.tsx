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
type SubHeadingProps = {
  itemId: string;
  value?: string | null;
  onChange: (id: string, text: string | null) => void;
};

const SubHeading: FC<SubHeadingProps> = ({
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
      data-placeholder="Add a subheading"
      className={classnames("sub-heading", geist.className)}
      tagName="h2"
    />
  );
};

export default SubHeading;
