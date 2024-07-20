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
export const saveDraft = async (variables: {
  data: SaveDraftInput;
  draftId?: string;
}) => {
  const apiPath = variables.draftId
    ? `/drafts/${variables.draftId}`
    : "/drafts";
  const { data: draft } = await axios.post(apiPath, variables.data);
  return draft as { message: string };
};

// hooks
const useSaveDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-draft"],
    mutationFn: saveDraft,
    onSettled: () => {
      // revalidate blog query
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};

export default useSaveDraft;
