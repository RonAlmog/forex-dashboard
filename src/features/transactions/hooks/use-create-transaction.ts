import { createTransaction } from "@/app/actions/create-transaction";
import { TransactionValues } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
