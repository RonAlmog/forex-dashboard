import { deleteTransaction } from "@/app/actions/delete-transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
