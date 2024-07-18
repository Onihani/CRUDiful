// next
import type { Metadata } from "next";

// layouts
import { BlogHomeLayout } from "@/components/layouts";

// fonts
import { geist } from "@/common/fonts";

// styles
import "@/styles/globals.css";
import "@/styles/custom.css";

export const metadata: Metadata = {
  title: "Investor Daily Dubai",
  description:
    "A blog sharing daily updates in Dubai Real Estate and Investment markets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <BlogHomeLayout>{children}</BlogHomeLayout>
      </body>
    </html>
  );
}
