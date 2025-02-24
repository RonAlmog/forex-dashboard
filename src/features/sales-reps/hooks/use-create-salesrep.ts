import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SalesRepValues } from "@/lib/schemas";
import { createSalesRep } from "../actions/create-salesrep";

const create = async (values: SalesRepValues) => {
  const response = await createSalesRep(values);
  return response.data;
};

export const useCreateSalesRep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesreps"] });
    },
    onError: (error) => {
      console.error("Error creating salesrep:", error);
    },
  });
};
