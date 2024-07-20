"use client";

// imports
import { FC, useState } from "react";
// imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import EditorHeader from "./header";
import EditorContent from "./content";

// context
import {
  EditorProvider,
  FormHookReturn,
} from "@/common/context/editor-context";

// schemas
import { draftSchema, DraftInputs } from "@/common/schemas";

// helpers
import { generateId, isJsonString } from "@/common/helpers";

// type
import { Article, DraftArticle } from "@/common/types";
type EditorAreaProps = {
  article?: Article | DraftArticle;
  articleType: "draft" | "published";
};

const EditorArea: FC<EditorAreaProps> = ({ article, articleType }) => {
  const defaultValues = {
    title: article?.title ?? "",
    image: article?.image?.url ? article.image : undefined,
    content:
      typeof article?.content === "string" &&
      isJsonString(articleType) &&
      Array.isArray(JSON.parse(article.content))
        ? JSON.parse(article.content)
        : [
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
  };

  // hooks
  const form = useForm<DraftInputs>({
    defaultValues: defaultValues,
    resolver: zodResolver(draftSchema),
  });

  // state
  const [editorForm, setEditorForm] = useState<FormHookReturn>(form);

  return (
    <main>
      <EditorProvider
        value={{
          form: editorForm,
          setForm: setEditorForm,
        }}
      >
        <EditorHeader articleId={article?.id} articleType={articleType} />
        <EditorContent />
      </EditorProvider>
    </main>
  );
};

export default EditorArea;
