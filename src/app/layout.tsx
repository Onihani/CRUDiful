"use client";

// imports
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";

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
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
