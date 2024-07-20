// imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// config
import { axios } from "@/common/config";

// fetcher
export const deleteDraft = async (draftId: string) => {
  await axios.delete(`/drafts/${draftId}`);
};

// hooks
const useDeleteDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-draft"],
    mutationFn: deleteDraft,
    onSettled: () => {
      // revalidate blog query
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};

export default useDeleteDraft;