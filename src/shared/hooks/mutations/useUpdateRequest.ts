import { useMutation } from "@tanstack/react-query";
import { updateRequest } from "../../api/requestApi";
import type { Status } from "../../types";

export function useUpdateRequest() {
  return useMutation({
    mutationFn: ({
      requestId,
      currentUserId,
      status,
      assigneeId,
    }: {
      requestId: string;
      currentUserId: string;
      status?: Status;
      assigneeId?: string | null;
    }) =>
      updateRequest(
        requestId,
        {
          status,
          assigneeId,
        },
        currentUserId
      ),
  });
}