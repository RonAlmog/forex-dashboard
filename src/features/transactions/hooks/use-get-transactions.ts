import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../actions/get-transactions";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};
