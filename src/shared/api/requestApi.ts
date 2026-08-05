import type { Status } from "../types";

export async function getRequests(
  userId: string
) {
  const response =
    await fetch("/requests", {
      headers: {
        "x-user-id": userId,
      },
    });

  if (!response.ok) {
    throw {
      status: response.status,
      message: "Failed to load requests",
    };
  }

  return response.json();
}

export async function getRequestById(
  id: string
) {
  const response =
    await fetch(
      `/requests/${id}`
    );

  if (!response.ok) {
    throw {
      status: response.status,
      message: "Failed to load request",
    };
  }

  return response.json();
}

export async function createRequest(
  data: {
    title: string;
    category: string;
    priority: string;
    description: string;
    requesterId: string;
    authorId: string;
  }
) {
  const response =
    await fetch(
      "/requests",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
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