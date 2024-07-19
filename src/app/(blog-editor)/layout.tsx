// next
import type { Metadata } from "next";

// layouts
import { BlogEditorLayout } from "@/components/layouts";

// fonts
import { geist } from "@/common/fonts";

// styles
import "@/styles/globals.css";
import "@/styles/custom.css";

export const metadata: Metadata = {
  title: "Blog Editor",
  description: "A blog editor for creating and managing blog posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <BlogEditorLayout>{children}</BlogEditorLayout>
      </body>
    </html>
  );
}
