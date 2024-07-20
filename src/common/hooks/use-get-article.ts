// imports
import { useQuery } from "@tanstack/react-query";
// config
import { axios } from "@/common/config";

// types
import { Article, DraftArticle } from "@/common/types";
type GetArticleInput = {
  id: string;
  type: "draft" | "published";
};

// fetcher
export const getArticle = async (variables: GetArticleInput) => {
  const apiPath = variables.type === "draft" ? "/drafts" : "/articles";
  const { data } = await axios.get(`${apiPath}/${variables.id}`);
  return data as Article | DraftArticle;
};

// hooks
const useGetArticle = (args: GetArticleInput) => {
  return useQuery({
    queryKey: ["article", args.id],
    queryFn: () => getArticle(args),
  });
};

export default useGetArticle;
