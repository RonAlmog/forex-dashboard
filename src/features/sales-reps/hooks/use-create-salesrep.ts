import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSalesRep } from "../actions/create-salesrep";

export const useCreateSalesRep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSalesRep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesreps"] });
    },
    onError: (error) => {
      console.error("Error creating salesrep:", error);
    },
  });
};
