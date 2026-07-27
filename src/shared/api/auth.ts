export const users = [
  {
    id: "user-1",
    name: "John Doe",
    email: "requester@deskline.com",
    password: "password123",
    role: "requester",
  },
  {
    id: "user-2",
    name: "John Wayne",
    email: "tech@deskline.com",
    password: "password123",
    role: "technician",
  },
  {
    id: "user-3",
    name: "John Electric",
    email: "admin@deskline.com",
    password: "password123",
    role: "admin",
  },
];

export function getCurrentUser() {
  const storedUser =
    localStorage.getItem(
      "currentUser"
    );

  return storedUser
    ? JSON.parse(storedUser)
    : null;
}