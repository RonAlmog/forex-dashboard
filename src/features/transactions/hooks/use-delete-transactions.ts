import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransactions } from "../actions/delete-transactions";

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { ids: string[] }) => deleteTransactions(params.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
