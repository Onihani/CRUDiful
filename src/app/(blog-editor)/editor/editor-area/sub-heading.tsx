"use client";

// react
import { FC, FormEventHandler, PropsWithChildren } from "react";

// types
type SubHeadingProps = PropsWithChildren<{}>;

const SubHeading: FC<SubHeadingProps> = ({ children }) => {
  // handers
  const handleInput: FormEventHandler<HTMLHeadingElement> = (event) => {
    console.log(event.currentTarget.textContent);
  };

  return (
    <h2
      contentEditable
      onInput={handleInput}
      data-placeholder="Add a subheading"
      className="sub-heading"
    >
      {children}
    </h2>
  );
};

export default SubHeading;
