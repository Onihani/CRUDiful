// react
import { FC, PropsWithChildren } from "react";

// components
import Header from "./header";

// types
type BlogEditorLayoutProps = PropsWithChildren<{}>;

const BlogEditorLayout: FC<BlogEditorLayoutProps> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default BlogEditorLayout;
