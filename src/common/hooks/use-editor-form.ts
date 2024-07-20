"use client";

// react
import { useContext } from "react";

// context
import { EditorContext } from "@/common/context";

const useEditorForm = () => {
  const { form } = useContext(EditorContext);

  return form;
};

export default useEditorForm;