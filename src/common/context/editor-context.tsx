"use client";

// react
import { Dispatch, SetStateAction, createContext } from "react";
// imports
import { UseFormReturn } from "react-hook-form";

// schemas
import { DraftInputs } from "@/common/schemas";
export type FormHookReturn = UseFormReturn<DraftInputs>;
type EditorContextType = {
  form: FormHookReturn;
  setForm: Dispatch<SetStateAction<FormHookReturn>>;
};

// context
const EditorContext = createContext<EditorContextType>({
  form: {} as FormHookReturn,
  setForm: () => {},
});

// provider
const EditorProvider = EditorContext.Provider;
// consumer
const EditorConsumer = EditorContext.Consumer;

export { EditorProvider, EditorConsumer };
export default EditorContext;
