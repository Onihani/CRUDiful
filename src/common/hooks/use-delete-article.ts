// imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// config
import { axios } from "@/common/config";

// type
type DeleteArticleInput = {
  id: string;
  type: "draft" | "published";
};

// fetcher
export const deleteArticle = async (variables: DeleteArticleInput) => {
  const apiPath = variables.type === "draft" ? "/drafts" : "/articles";
  await axios.delete(`/${apiPath}/${variables.id}`);
};

// hooks
const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-article"],
    mutationFn: deleteArticle,
    onSettled: () => {
      // revalidate blog query
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};

export default useDeleteArticle;
