// imports
import { z } from "zod";

// schema
export const articleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title must be at least 3 characters"),
  image: z.object({
    url: z.union([z.string().url(), z.instanceof(File)]),
    alt: z.string().trim().optional(),
  }),
  content: z
    .object({
      itemID: z.string(),
      type: z.enum(["sub-heading", "paragraph", "divider"]),
      value: z.string().optional(),
    })
    .array(),
});

export const draftSchema = articleSchema.partial({
  image: true,
  content: true,
});

// types
export type DraftInputs = z.infer<typeof draftSchema>;
export type ArticleInputs = z.infer<typeof articleSchema>;
