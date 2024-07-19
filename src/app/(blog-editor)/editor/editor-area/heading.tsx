"use client";

// react
import { FC, useCallback, useRef, useState, useLayoutEffect } from "react";
// imports
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// fonts
import { playfairDisplay } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type HeadingProps = {
  value?: string | null;
  onChange: (text: string | null) => void;
};

const Heading: FC<HeadingProps> = ({ value, onChange: onInputChange }) => {
  // refs
  const ref = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState<string>("");

  // handers
  const handleInput = useCallback((event: ContentEditableEvent) => {
    const updatedText = event.target.value;
    setText(event.target.value);
    onInputChange(updatedText);
  }, []);

  // effects
  useLayoutEffect(() => {
    if (value) setText(value);
  }, []);

  return (
    <ContentEditable
      innerRef={ref}
      html={text}
      onChange={handleInput}
      data-placeholder="Begin with an interesting heading here"
      className={classnames("heading", playfairDisplay.className)}
      tagName="h1"
    />
  );
};

export default Heading;
