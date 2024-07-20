// react
import { FC, PropsWithChildren } from "react";

// components
import Header from "./header";

// types
type BlogHomeLayoutProps = PropsWithChildren<{}>;

const BlogHomeLayout: FC<BlogHomeLayoutProps> = ({children}) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default BlogHomeLayout;
