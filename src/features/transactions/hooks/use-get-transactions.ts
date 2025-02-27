import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../actions/get-transactions";
import { TransactionValues } from "@/lib/schemas";

export const useGetTransactions = () => {
  return useQuery<TransactionValues[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await getTransactions();
      if (!Array.isArray(response)) {
        throw new Error("Failed to fetch transactions");
      }
      return response;
    },
  });
};
