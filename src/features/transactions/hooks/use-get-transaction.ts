import { getTransaction } from "@/app/actions/get-transaction";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
};
