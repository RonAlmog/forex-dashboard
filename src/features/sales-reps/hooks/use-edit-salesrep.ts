import { SalesRepValues } from "@/lib/schemas";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSalesRep } from "../actions/edit-salesrep";

export const useEditSalesRep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: SalesRepValues) => {
      return editSalesRep(values);
    },
    onSuccess: (_, values) => {
      queryClient.invalidateQueries({ queryKey: ["salesrep", values.id] });
      queryClient.invalidateQueries({ queryKey: ["salesreps"] });
    },
    onError: (error) => {
      console.error("Error editing salesreps:", error);
    },
  });
};
