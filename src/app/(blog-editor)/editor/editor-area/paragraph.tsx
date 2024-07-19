"use client";

// react
import { FC, FormEventHandler } from "react";

// types
type ParagraphProps = {
  id: string;
  value?: string | null;
  onChange: (id: string, text: string | null) => void;
};

const Paragraph: FC<ParagraphProps> = ({ id, value, onChange }) => {
  // handers
  const handleInput: FormEventHandler<HTMLParagraphElement> = (event) => {
    onChange(id, event.currentTarget.textContent);
  };

  return (
    <p
      contentEditable
      onInput={handleInput}
      data-placeholder="Start your paragraph here.."
      className="paragraph"
      dangerouslySetInnerHTML={{ __html: value ?? "" }}
    />
  );
};

export default Paragraph;
