import { useMutation } from "@tanstack/react-query";
import { addComment } from "../../api/requestApi";

export function useAddComment() {
  return useMutation({
    mutationFn: ({
      requestId,
      authorId,
      body,
    }: {
      requestId: string;
      authorId: string;
      body: string;
    }) =>
      addComment(requestId, {
        authorId,
        body,
      }),
  });
}