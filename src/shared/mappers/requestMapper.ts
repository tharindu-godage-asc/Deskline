import type { ApiRequest } from "../types/api/ApiRequest";
import type { Request } from "../types/request";

export function mapRequest(
  apiRequest: ApiRequest
): Request {
  return {
    id: apiRequest.id,
    title: apiRequest.title,
    status: apiRequest.status as Request["status"],
    priority: apiRequest.priority as Request["priority"],
    category: apiRequest.category as Request["category"],
    requesterId: apiRequest.requesterId,
    assigneeId: apiRequest.assigneeId,
    createdAt: apiRequest.createdAt,
    updatedAt: apiRequest.updatedAt,
  };
}