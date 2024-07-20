"use client";

// react
import { FC, PropsWithChildren, useState } from "react";
// imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import Header from "./header";

// helpers
import { generateId } from "@/common/helpers";

// context
import {
  EditorProvider,
  FormHookReturn,
} from "@/common/context/editor-context";

// types
import { draftSchema, DraftInputs } from "@/common/schemas";
import { Article, DraftArticle } from "@/common/types";
type BlogEditorLayoutProps = PropsWithChildren<{
  article: Article | DraftArticle;
  articleType?: "draft" | "published";
}>;

const BlogEditorLayout: FC<BlogEditorLayoutProps> = ({
  article,
  articleType,
  children,
}) => {
  // hooks
  const form = useForm<DraftInputs>({
    defaultValues: {
      title: "",
      content: [
        {
          itemID: generateId("sub-heading"),
          type: "sub-heading",
          value: "",
        },
        {
          itemID: generateId("paragraph"),
          type: "paragraph",
          value: "",
        },
      ],
    },
    resolver: zodResolver(draftSchema),
  });

  // state
  const [editorForm, setEditorForm] = useState<FormHookReturn>(form);

  return (
    <EditorProvider
      value={{
        form: editorForm,
        setForm: setEditorForm,
      }}
    >
      <main>
        <Header articleId={article?.id} articleType={articleType} />
        {children}
      </main>
    </EditorProvider>
  );
};

export default BlogEditorLayout;
