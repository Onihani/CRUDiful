// components
import EditorArea from "./editor-area";

// config
import { axios } from "@/common/config";

// data fetchers
const articleFetcher = async (
  articleId?: string,
  articleType?: "draft" | "published"
) => {
  if (!articleId || !articleType) return null;
  if (!["draft", "published"].includes(articleType)) return null;

  const apiPath = articleType === "draft" ? "drafts" : "articles";
  const response = await axios.get(`/${apiPath}/${articleId}`);
  if (response.status === 200) {
    return response.data as Article | DraftArticle;
  }

  return null;
};

// types
import { Article, DraftArticle } from "@/common/types";

export default async function BlogEditorPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const articleType = searchParams?.articleType as "draft" | "published";
  const article = await articleFetcher(
    searchParams?.articleId as string,
    searchParams?.articleType as "draft" | "published"
  );

  return (
    <EditorArea article={article ?? undefined} articleType={articleType} />
  );
}
