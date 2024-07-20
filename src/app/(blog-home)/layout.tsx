"use client";

// imports
import { QueryClientProvider } from "@tanstack/react-query";

// layouts
import { BlogHomeLayout } from "@/components/layouts";

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
        <QueryClientProvider client={queryClient}>
          <BlogHomeLayout>{children}</BlogHomeLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
