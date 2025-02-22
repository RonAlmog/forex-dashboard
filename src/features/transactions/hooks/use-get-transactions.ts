import { getTransactions } from "@/app/actions/get-transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};
