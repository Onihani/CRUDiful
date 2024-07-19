"use client";

// imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

// components
import {
  Divider,
  Heading,
  HeroImage,
  Paragraph,
  SubHeading,
} from "./editor-area";

// schema
import { draftSchema, DraftInputs } from "./form-schema";

// helpers
import { generateId } from "@/common/helpers";

// types
import { ContentType } from "@/common/types";

export default function BlogEditor() {
  // form
  const {
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<DraftInputs>({
    defaultValues: {
      title: "",
      // image: {
      //   url: "",
      //   alt: "",
      // },
      content: [
        {
          id: generateId("sub-heading"),
          type: "sub-heading",
          value: "",
        },
        {
          id: generateId("paragraph"),
          type: "paragraph",
          value: "",
        },
      ],
    },
    resolver: zodResolver(draftSchema),
  });
  const contentFieldArray = useFieldArray({
    name: "content",
    control: control,
  });

  // handlers
  const handleHeadingChange = (text: string | null) => {
    if (text) setValue("title", text);
  };

  const handleContentChange = (id: string, text: string | null) => {
    const contentIndex = contentFieldArray.fields.findIndex(
      (field) => field.id === id
    );
    if (contentIndex && text) {
      contentFieldArray.update(contentIndex, {
        ...contentFieldArray.fields[contentIndex],
        value: text,
      });
    }
  };

  const handleContentAdd = (type: ContentType, value?: string | null) => {
    contentFieldArray.append({
      id: generateId(type),
      type: type,
      value: value ?? undefined,
    });
  };

  const handleDeleteContent = (id: string) => {
    const contentIndex = contentFieldArray.fields.findIndex(
      (field) => field.id === id
    );
    if (contentIndex) contentFieldArray.remove(contentIndex);
  };

  console.log({
    data: getValues(),
  });

  return (
    <div className="max-w-4xl mx-auto py-20">
      <Heading value={getValues("title")} onChange={handleHeadingChange} />
      <HeroImage image={getValues("image")} />
      <hr className="border-black/20 mb-8" />
      {contentFieldArray.fields.map((field) => {
        switch (field.type) {
          case "sub-heading":
            return (
              <SubHeading
                key={field.id}
                id={field.id}
                value={field.value}
                onChange={handleContentChange}
              />
            );
          case "paragraph":
            return (
              <Paragraph
                key={field.id}
                id={field.id}
                value={field.value}
                onChange={handleContentChange}
              />
            );
          case "divider":
            return <Divider key={field.id} id={field.id} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
