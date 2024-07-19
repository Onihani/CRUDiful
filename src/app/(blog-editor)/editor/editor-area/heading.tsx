"use client";

// react
import { FC, FormEventHandler } from "react";

// fonts
import { playfairDisplay } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type HeadingProps = {
  value?: string | null;
  onChange: (text: string | null) => void;
};

const Heading: FC<HeadingProps> = ({ value , onChange}) => {
  // handers
  const handleInput: FormEventHandler<HTMLHeadingElement> = (event) => {
    onChange(event.currentTarget.textContent);
  };

  return (
    <h1
      contentEditable
      onInput={handleInput}
      data-placeholder="Begin with an interesting heading here"
      className={classnames("heading", playfairDisplay.className)}
      dangerouslySetInnerHTML={{ __html: value ?? "" }}
    />
  );
};

export default Heading;
