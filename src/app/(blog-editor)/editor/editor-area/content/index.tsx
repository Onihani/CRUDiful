"use client";

// react
import { useLayoutEffect } from "react";
// imports
import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

// components
import Divider from "./divider";
import Heading from "./heading";
import HeroImage from "./hero-image";
import Paragraph from "./paragraph";
import SubHeading from "./sub-heading";
// ui components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ContentComponents = {
  [ContentType.subHeading]: SubHeading,
  [ContentType.paragraph]: Paragraph,
  [ContentType.divider]: Divider,
};

// hooks
import { useEditorForm } from "@/common/hooks";

// helpers
import { generateId } from "@/common/helpers";

// types
import { ContentType } from "@/common/types";

const EditorContent = () =>{
  // form
  const {
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useEditorForm();
  const contentFieldArray = useFieldArray({
    name: "content",
    control: control,
  });

  // handlers
  const handleHeadingChange = (text: string | null) => {
    if (text) setValue("title", text);
  };

  const handleImageChange = (file: File | null) => {
    if (file) setValue("image.url", file);
  };

  const handleImageCaptionChange = (text: string | null) => {
    if (text) setValue("image.alt", text);
  };

  const handleContentChange = (id: string, text: string | null) => {
    const contentIndex = contentFieldArray.fields.findIndex(
      (field) => field.itemID === id
    );
    if (contentIndex >= 0 && text) {
      const currentContent = contentFieldArray.fields[contentIndex];
      contentFieldArray.update(contentIndex, {
        ...currentContent,
        value: text,
      });
    }
  };

  const handleContentAdd = (type: ContentType, value?: string | null) => {
    contentFieldArray.append({
      itemID: generateId(type),
      type: type,
      value: value ?? undefined,
    });
  };

  const handleDeleteContent = (id: string) => {
    const contentIndex = contentFieldArray.fields.findIndex(
      (field) => field.itemID === id
    );
    console.log({ id , deleteIndex: contentIndex });
    if (contentIndex) contentFieldArray.remove(contentIndex);
  };

  // effects
  useLayoutEffect(() => {
    return () => {
      // cleanup
      reset();
    };
  }, []);

  console.log({
    data: getValues(),
  });

  return (
    <div>
      <div className="max-w-4xl mx-auto py-20">
        <Heading value={getValues("title")} onChange={handleHeadingChange} />
        <HeroImage
          image={getValues("image")}
          onImageChange={handleImageChange}
          onCaptionChange={handleImageCaptionChange}
        />
        <hr className="border-black/20 mb-8" />
        {contentFieldArray.fields.map((field) => {
          const Component = ContentComponents[field.type];

          return (
            <Component
              key={field.itemID}
              itemId={field.itemID}
              value={field.value}
              onChange={handleContentChange}
              onDelete={handleDeleteContent}
            />
          );
        })}
      </div>
      <div className="fixed right-5 bottom-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="bg-white hover:bg-white hover:brightness-90 !py-3 md:!py-[15px] !px-6 !h-auto !text-[#222222] font-medium! border border-black/10 rounded-full shadow-lg"
            >
              <span>Add Element</span>
              <Plus size={20} className="ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="!py-3 !px-4 text-[15px] text-[#444444] spacing-y-4">
            <DropdownMenuItem
              onClick={() => handleContentAdd(ContentType.subHeading)}
            >
              Sub-heading
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleContentAdd(ContentType.paragraph)}
            >
              Paragraph
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleContentAdd(ContentType.divider)}
            >
              Divider
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default EditorContent;