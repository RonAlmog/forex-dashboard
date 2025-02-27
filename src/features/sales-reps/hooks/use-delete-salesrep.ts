import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSalesRep } from "../actions/delete-salesrep";

export const useDeleteSalesRep = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSalesRep(id).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesrep", id] });
      queryClient.invalidateQueries({ queryKey: ["salesreps"] });
    },
    onError: (error) => {
      console.error("Error deleting salesreps:", error);
    },
  });
};
