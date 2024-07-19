"use client";

// react
import { FC, FormEventHandler, PropsWithChildren } from "react";

// fonts
import { playfairDisplay } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type HeadingProps = PropsWithChildren<{}>;

const Heading: FC<HeadingProps> = ({ children }) => {
  // handers
  const handleInput: FormEventHandler<HTMLHeadingElement> = (event) => {
    console.log(event.currentTarget.textContent);
  };

  return (
    <h1
      contentEditable
      onInput={handleInput}
      data-placeholder="Begin with an interesting heading here"
      className={classnames("heading", playfairDisplay.className)}
    >
      {children}
    </h1>
  );
};

export default Heading;
