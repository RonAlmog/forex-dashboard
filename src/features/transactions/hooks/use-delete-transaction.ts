import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../actions/delete-transaction";

const deleteTran = async (id: string) => {
  const response = await deleteTransaction(id);
  return response.data;
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTran,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      console.error("Error deleting transaction:", error);
    },
  });
};
