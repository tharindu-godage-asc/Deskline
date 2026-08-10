import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userApi";
import { type User } from "../../types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

export function getUserNameById(
  users: User[],
  userId: string
) {
  return users.find(
    (user) => user.id === userId
  )?.name ?? "Unknown";
}