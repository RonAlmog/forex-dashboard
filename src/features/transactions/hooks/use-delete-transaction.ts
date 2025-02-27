import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../actions/delete-transaction";

export const useDeleteTransaction = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTransaction(id).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", id] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      console.error("Error deleting transaction:", error);
    },
  });
};
