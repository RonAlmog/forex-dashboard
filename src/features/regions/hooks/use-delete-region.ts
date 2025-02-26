import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegion } from "../actions/delete-region";

const delRegion = async (id: string) => {
  const response = await deleteRegion(id);
  return response.data;
};

export const useDeleteRegion = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await delRegion(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["region", id] });
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
    onError: (error) => {
      console.error("Error deleting regions:", error);
    },
  });
};
