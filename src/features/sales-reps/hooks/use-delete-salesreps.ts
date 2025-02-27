import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSalesReps } from "../actions/delete-salesreps";

export const useDeleteSalesReps = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { ids: string[] }) => deleteSalesReps(params.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesreps"] });
    },
  });
};
