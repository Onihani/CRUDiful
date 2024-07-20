// components
import EditorArea from "../../editor-area";

// config
import { axios } from "@/common/config";

// data fetchers
const articleFetcher = async (
  articleId: string,
) => {
  if (!articleId) return null;

  const response = await axios.get(`/drafts/${articleId}`);
  if (response.status === 200) {
    return response.data as DraftArticle;
  }

  return null;
};

// types
import { DraftArticle } from "@/common/types";

export default async function BlogEditorDraftPage({
  params,
}: {
  params: { draftId: string };
}) {
  const article = await articleFetcher(params.draftId);

  return (
    <EditorArea article={article ?? undefined} articleType="draft" />
  );
}

