import { useQuery } from "@tanstack/react-query";
import { getSaleReps } from "../actions/get-salesreps";

export const useGetSalesReps = () => {
  return useQuery({
    queryKey: ["salesreps"],
    queryFn: getSaleReps,
  });
};
