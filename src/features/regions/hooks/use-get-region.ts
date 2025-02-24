import { useQuery } from "@tanstack/react-query";
import { getRegion } from "../actions/get-region";

export const useGetRegion = (id: string) => {
  return useQuery({
    queryKey: ["region", id],
    queryFn: () => getRegion(id),
    enabled: !!id,
  });
};
