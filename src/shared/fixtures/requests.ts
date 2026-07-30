/**
 * Step 3: Provides mock data for the Deskline application during the initial
 * development stage.
 *
 * These in-memory fixtures simulate users and requests before backend
 * integration is introduced. They allow the UI and application flow
 * to be developed and tested without relying on an external API.
 */

import type {
  Request
} from "../types";
//   {
//     id: "u1",
//     name: "John Smith",
//     email: "john@test.com",
//     role: "requester",
//   },
//   {
//     id: "u2",
//     name: "Sarah Wilson",
//     email: "sarah@test.com",
//     role: "technician",
//   },
//   {
//     id: "u3",
//     name: "Mike Admin",
//     email: "admin@test.com",
//     role: "admin",
//   },
// ];

const baseRequests: Request[] = [
  {
    id: "r1",
    title: "Laptop screen flickering",
    status: "open",
    priority: "high",
    category: "hardware",
    requesterId: "user-4",
    assigneeId: "user-3",
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
    {
    id: "r4",
    title: "Laptop not switching on",
    status: "open",
    priority: "high",
    category: "hardware",
    requesterId: "user-1",
    assigneeId: "user-3",
    createdAt: "2025-07-22",
    updatedAt: "2025-07-22",
  },
];

const statuses = [
  "open",
  "pending",
  "closed",
  "cancelled",
] as const;

const priorities = [
  "low",
  "medium",
  "high",
] as const;

const categories = [
  "hardware",
  "software",
  "facilities",
  "access",
] as const;

const generatedRequests: Request[] =
  Array.from(
    { length: 600 },
    (_, index) => ({
      id: `generated-${index + 1}`,
      title: `Generated Request ${index + 1}`,
      status:
        statuses[
          index %
            statuses.length
        ],

      priority:
        priorities[
          index %
            priorities.length
        ],

      category:
        categories[
          index %
            categories.length
        ],

      requesterId:
        index % 2 === 0
          ? "user-1"
          : "user-4",

      assigneeId:
        index % 5 === 0
          ? null
          : "user-2",

      createdAt: "2025-07-22",
      updatedAt: "2025-07-22",
    })
  );


export const requests = [
  ...baseRequests,
  ...generatedRequests,
];