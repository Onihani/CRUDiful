"use client";

// components
import { HeroArea, ArticlesList } from "./blog-home-area";

// hooks
import { useGetBlog } from "@/common/hooks";

export default function BlogHome() {
  const { isLoading, isError, data: blog } = useGetBlog();

  return (
    <>
      <HeroArea cover={blog?.cover} />
      <ArticlesList
        error={isError}
        loading={isLoading}
        articles={blog?.articles ?? []}
        drafts={blog?.drafts ?? []}
      />
    </>
  );
}
