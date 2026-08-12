import type { User } from "../types";

export async function getUsers(): Promise<User[]> {
  const response =
    await fetch("/users");

  if (!response.ok) {
    throw new Error(
      "Failed to load users"
    );
  }

  return response.json() as Promise<User[]>;
}
