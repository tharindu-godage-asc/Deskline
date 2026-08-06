import type { ApiMessage } from "../types/api/ApiMessage";
import type { Message } from "../types/message";

export function mapMessage(
  apiMessage: ApiMessage
): Message {
  return {
    id: apiMessage.id,
    requestId: apiMessage.requestId,
    authorId: apiMessage.authorId,
    body: apiMessage.body,
    createdAt: apiMessage.createdAt,
  };
}