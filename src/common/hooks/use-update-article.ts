"use client"

// imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// config
import { axios } from "@/common/config";

// type
import { DraftInputs } from "../schemas";
type UpdateDraftInput = Omit<DraftInputs, "image" | "content"> & {
  image?: {
    url: string;
    alt?: string;
  };
  content: string;
};

// fetcher
export const updateArticle = async (variables: {
  data: UpdateDraftInput;
  type: "draft" | "article";
  id: string;
}) => {
  const apiPath = variables.type === "draft" ? "drafts" : "articles";
  const { data: draft } = await axios.put(`/${apiPath}/${variables.id}`, variables.data);
  return draft as { message: string };
};

// hooks
const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-article"],
    mutationFn: updateArticle,
    onSettled: () => {
      // revalidate blog query
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};

export default useUpdateArticle;
