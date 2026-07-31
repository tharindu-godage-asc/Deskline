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
    throw new Error(
      "Failed to load requests"
    );
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
    throw new Error(
      "Failed to load request"
    );
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
    author: string;
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
    author: string;
    message: string;
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