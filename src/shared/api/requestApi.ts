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