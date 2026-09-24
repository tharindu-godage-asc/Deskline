export const PASSWORD = "password123";

export const users = {
  requester: {
    email: "requester@deskline.com",
    home: /my-requests/,
    storageState: ".auth/requester.json",
  },
  technician: {
    email: "tech@deskline.com",
    home: /queue/,
    storageState: ".auth/technician.json",
  },
  admin: {
    email: "admin@deskline.com",
    home: /queue/,
    storageState: ".auth/admin.json",
  },
} as const;

export type Role = keyof typeof users;
