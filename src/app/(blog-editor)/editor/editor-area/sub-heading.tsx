"use client";

// react
import { FC, FormEventHandler } from "react";

// types
type SubHeadingProps = {
  id: string;
  value?: string | null;
  onChange: (id: string, text: string | null) => void;
};

const SubHeading: FC<SubHeadingProps> = ({ id, value, onChange }) => {
  // handers
  const handleInput: FormEventHandler<HTMLHeadingElement> = (event) => {
    onChange(id, event.currentTarget.textContent);
  };

  return (
    <h2
      contentEditable
      onInput={handleInput}
      data-placeholder="Add a subheading"
      className="sub-heading"
      dangerouslySetInnerHTML={{ __html: value ?? "" }}
    />
  );
};

export default SubHeading;
