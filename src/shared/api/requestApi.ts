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