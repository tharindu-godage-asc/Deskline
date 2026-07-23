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
