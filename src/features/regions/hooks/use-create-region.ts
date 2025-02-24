import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegionValues } from "@/lib/schemas";
import { createRegion } from "../actions/create-region";

const create = async (values: RegionValues) => {
  const response = await createRegion(values);
  return response.data;
};

export const useCreateRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
    onError: (error) => {
      console.error("Error creating region:", error);
    },
  });
};
