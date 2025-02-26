import { RegionValues } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRegion } from "../actions/edit-region";

export const useEditRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: RegionValues) => {
      return editRegion(values);
    },
    onSuccess: (_, values) => {
      queryClient.invalidateQueries({ queryKey: ["region", values.id] });
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
    onError: (error) => {
      console.error("Error editing regions:", error);
    },
  });
};
