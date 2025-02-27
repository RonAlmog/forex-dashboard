import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "../actions/get-transaction";

export const useGetTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
};
