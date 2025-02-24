import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSalesRep } from "../actions/delete-salesrep";

const delSalesRep = async (id: string) => {
  const response = await deleteSalesRep(id);
  return response.data;
};

export const useDeleteSalesRep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: delSalesRep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesreps"] });
    },
    onError: (error) => {
      console.error("Error deleting salesreps:", error);
    },
  });
};
