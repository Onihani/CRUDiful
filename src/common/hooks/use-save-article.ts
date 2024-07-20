// imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// config
import { axios } from "@/common/config";

// schemas
import { DraftInputs } from "../schemas";
type SaveDraftInput = Omit<DraftInputs, "image" | "content"> & {
  image?: {
    url: string;
    alt?: string;
  };
  content: string;
};

// fetcher
export const saveArticle = async (variables: {
  data: SaveDraftInput;
  type: "draft" | "article";
}) => {
  const apiPath = variables.type === "draft" ? "/drafts" : "/articles";
  const { data: draft } = await axios.post(apiPath, variables.data);
  return draft as { message: string };
};

// hooks
const useSaveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-article"],
    mutationFn: saveArticle,
    onSettled: () => {
      // revalidate blog query
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};

export default useSaveArticle;
