import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegion } from "../actions/delete-region";

export const useDeleteRegion = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRegion(id).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["region", id] });
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
    onError: (error) => console.error("Error deleting regions:", error),
  });
};
