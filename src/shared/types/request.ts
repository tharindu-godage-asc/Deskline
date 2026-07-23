/**
 * Step 1. Defines the core domain types for the Deskline application.
 *
 * These TypeScript types represent the primary entities and enums used
 * throughout the application, including requests, users, messages,
 * roles, priorities, categories, and request statuses. Centralizing
 * these definitions ensures type safety, consistency, and reusability
 * across the codebase.
 */

export type Status = "open" | "pending" | "closed" | "cancelled";

export type Priority = "low" | "medium" | "high";

export type Category =
  | "hardware"
  | "software"
  | "facilities"
  | "access";

export type UserRole =
  | "requester"
  | "technician"
  | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Message = {
  id: string;
  requestId: string;
  authorId: string;
  body: string;
  createdAt: string;
};

export type Request = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  category: Category;
  requesterId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
};
