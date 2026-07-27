/**
 * Step 3: Provides mock data for the Deskline application during the initial
 * development stage.
 *
 * These in-memory fixtures simulate users and requests before backend
 * integration is introduced. They allow the UI and application flow
 * to be developed and tested without relying on an external API.
 */

import type {
  Request,
  User
} from "../types";

export const users: User[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john@test.com",
    role: "requester",
  },
  {
    id: "u2",
    name: "Sarah Wilson",
    email: "sarah@test.com",
    role: "technician",
  },
  {
    id: "u3",
    name: "Mike Admin",
    email: "admin@test.com",
    role: "admin",
  },
];

export const requests: Request[] = [
  {
    id: "r1",
    title: "Laptop screen flickering",
    status: "open",
    priority: "high",
    category: "hardware",
    requesterId: "user-1",
    assigneeId: "u2",
    createdAt: "2025-07-22",
    updatedAt: "2025-07-22",
  },
  {
    id: "r2",
    title: "VPN not connecting",
    status: "pending",
    priority: "medium",
    category: "software",
    requesterId: "user-1",
    assigneeId: "user-3",
    createdAt: "2025-07-21",
    updatedAt: "2025-07-22",
  },
  {
    id: "r3",
    title: "Need meeting room access",
    status: "closed",
    priority: "low",
    category: "access",
    requesterId: "user-1",
    assigneeId: "user-2",
    createdAt: "2025-07-20",
    updatedAt: "2025-07-21",
  },
];