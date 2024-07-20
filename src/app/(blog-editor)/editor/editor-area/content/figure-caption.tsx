"use client";

// react
import { FC, useRef, useState, useCallback, useLayoutEffect } from "react";
// imports
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// fonts
import { geist } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type FigureCaptionProps = {
  value?: string | null;
  onChange: (text: string) => void;
};

const FigureCaption: FC<FigureCaptionProps> = ({
  value,
  onChange: onInputChange,
}) => {
  // refs
  const ref = useRef<HTMLElement>(null);

  const [text, setText] = useState<string>("");

  // handers
  const handleInput = useCallback((event: ContentEditableEvent) => {
    const updatedText = event.target.value;
    setText(event.target.value);
    onInputChange(updatedText);
  }, []);

  useLayoutEffect(() => {
    if (value) setText(value);
  }, []);

  return (
    <ContentEditable
      innerRef={ref}
      html={text}
      onChange={handleInput}
      data-placeholder="Write a caption here.."
      className={classnames("figcaption", geist.className)}
      tagName="p"
    />
  );
};

export default FigureCaption;
