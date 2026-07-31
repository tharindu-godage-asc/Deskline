export async function getUsers() {
  const response =
    await fetch("/users");

  if (!response.ok) {
    throw new Error(
      "Failed to load users"
    );
  }

  return response.json();
}
