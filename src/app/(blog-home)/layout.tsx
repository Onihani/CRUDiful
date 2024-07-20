// layouts
import { BlogHomeLayout } from "@/components/layouts";

export default function RootBlogHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlogHomeLayout>{children}</BlogHomeLayout>;
}
