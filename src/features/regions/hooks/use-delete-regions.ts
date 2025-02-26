import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegions } from "../actions/delete-regions";

export const useDeleteRegions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { ids: string[] }) => deleteRegions(params.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
  });
};
