import { useQuery } from "@tanstack/react-query";
import { getSalesRep } from "../actions/get-salesrep";

export const useGetSalesRep = (id: string) => {
  return useQuery({
    queryKey: ["salesrep", id],
    queryFn: () => getSalesRep(id),
    enabled: !!id,
  });
};
