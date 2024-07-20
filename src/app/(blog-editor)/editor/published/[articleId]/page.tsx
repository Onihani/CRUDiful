// components
import EditorArea from "../../editor-area";

// config
import { axios } from "@/common/config";

// data fetchers
const articleFetcher = async (
  articleId: string,
) => {
  if (!articleId) return null;

  const response = await axios.get(`/articles/${articleId}`);
  if (response.status === 200) {
    return response.data as Article;
  }

  return null;
};

// types
import { Article } from "@/common/types";

export default async function BlogEditorPublishedPage({
  params,
}: {
  params: { articleId: string };
}) {
  const article = await articleFetcher(params.articleId);

  return (
    <EditorArea article={article ?? undefined} articleType="published" />
  );
}

