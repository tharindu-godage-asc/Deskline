import type { Status } from "../types";
import type { ApiRequest } from "../types/api/ApiRequest";
import type { ApiMessage } from "../types/api/ApiMessage";
import type { Request } from "../types/request";
import type { Message } from "../types/message";
import { mapRequest } from "../mappers/requestMapper";
import { mapMessage } from "../mappers/messageMapper";

export async function getRequests(userId: string): Promise<Request[]> {
  const response = await fetch("/requests", { headers: { "x-user-id": userId } });
  if (!response.ok) throw { status: response.status, message: "Failed to load requests" };

  const apiRequests = await response.json() as ApiRequest[];
  return apiRequests.map(mapRequest);
}

export async function getRequestById(id: string, currentUserId: string): Promise<{ request: Request; messages: Message[] }> {
  const response = await fetch(`/requests/${id}`, { headers: { "x-user-id": currentUserId } });
  if (!response.ok) throw { status: response.status, message: "Failed to load request" };

  const result = await response.json() as { request: ApiRequest; messages: ApiMessage[] };
  return {
    request: mapRequest(result.request),
    messages: result.messages.map(mapMessage),
  };
}

export async function createRequest(
  data: {
    title: string;
    category: string;
    priority: string;
    description: string;
    requesterId: string;
    authorId: string;
  },
  currentUserId: string
) {
  const response =
    await fetch(
      "/requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify(
          data
        ),
      }
    );

  if (!response.ok) {
    throw new Error(
      "Failed to create request"
    );
  }

  return response.json();
}

export async function addComment(
  requestId: string,
  data: {
    authorId: string;
    body: string;
  }
) {
  const response =
    await fetch(
      `/requests/${requestId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          "x-user-id": data.authorId,
        },
        body: JSON.stringify(data),
      }
    );

  if (!response.ok) {
    throw new Error(
      "Failed to add comment"
    );
  }

  return response.json();
}

export async function updateRequest(
  requestId: string,
  data: {
    status?: Status;
    assigneeId?: string | null;
  },
  currentUserId: string
) {
  const response = await fetch(
    `/requests/${requestId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUserId,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update request"
    );
  }

  return response.json();
}