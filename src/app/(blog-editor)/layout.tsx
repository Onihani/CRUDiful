"use client";

// layouts
import { BlogEditorLayout } from "@/components/layouts";

export default function RootBlogEditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlogEditorLayout>{children}</BlogEditorLayout>;
}
