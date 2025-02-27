import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../actions/create-transaction";
import { TransactionValues } from "@/lib/schemas";

const create = async (values: TransactionValues) => {
  const response = await createTransaction(values);
  return response.data;
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      console.error("Error creating transaction:", error);
    },
  });
};
