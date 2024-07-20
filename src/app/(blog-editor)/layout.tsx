"use client";

// imports
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";

// layouts
import { BlogEditorLayout } from "@/components/layouts";

// config
import { queryClient } from "@/common/config";

// fonts
import { geist } from "@/common/fonts";

// styles
import "@/styles/globals.css";
import "@/styles/custom.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Toaster richColors position="top-right" />
        <QueryClientProvider client={queryClient}>
          <BlogEditorLayout>{children}</BlogEditorLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
