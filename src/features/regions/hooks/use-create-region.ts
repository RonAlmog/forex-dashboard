import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegion } from "../actions/create-region";

export const useCreateRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
  });
};
