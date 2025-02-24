import { SalesRepValues } from "@/lib/schemas";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSalesRep } from "../actions/edit-salesrep";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: SalesRepValues) => {
      return editSalesRep(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesreps"] });
    },
    onError: (error) => {
      console.error("Error editing salesreps:", error);
    },
  });
};
