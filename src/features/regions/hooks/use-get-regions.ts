import { useQuery } from "@tanstack/react-query";
import { getRegions } from "../actions/get-regions";

export const useGetRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
};
