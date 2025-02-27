import { TransactionValues } from "@/lib/schemas";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTransaction } from "../actions/edit-transaction";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: TransactionValues) => {
      return editTransaction(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      console.error("Error editing transaction:", error);
    },
  });
};
