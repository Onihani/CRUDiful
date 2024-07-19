"use client";

// react
import { FC, FormEventHandler, PropsWithChildren } from "react";

// types
type ParagraphProps = PropsWithChildren<{}>;

const Paragraph: FC<ParagraphProps> = ({ children }) => {
  // handers
  const handleInput: FormEventHandler<HTMLParagraphElement> = (event) => {
    console.log(event.currentTarget.textContent);
  };

  return (
    <p
      contentEditable
      onInput={handleInput}
      data-placeholder="Start your paragraph here.."
      className="paragraph"
    >
      {children}
    </p>
  );
};

export default Paragraph;
