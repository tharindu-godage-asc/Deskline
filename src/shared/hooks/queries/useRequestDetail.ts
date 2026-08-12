import { useQuery } from "@tanstack/react-query";
import { getRequestById } from "../../api/requestApi";

export function useRequestDetail(
  requestId: string,
  userId: string
) {
  return useQuery({
    queryKey: ["request", requestId],

    queryFn: () =>
      getRequestById(
        requestId,
        userId
      ),

    enabled: !!requestId && !!userId,
  });
}
