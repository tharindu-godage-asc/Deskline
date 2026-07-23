import { type Status, type Priority, type Category } from "../types";

export const statusColors: Record<Status, string> = {
  open: "var(--status-open)",
  pending: "var(--status-pending)",
  closed: "var(--status-closed)",
  cancelled: "var(--status-cancelled)",
};

export const priorityColors: Record<
  Priority,
  string
> = {
  low: "var(--priority-low)",
  medium: "var(--priority-medium)",
  high: "var(--priority-high)",
};

export const categoryColors: Record<
  Category,
  string
> = {
  hardware: "var(--category-hardware)",
  software: "var(--category-software)",
  facilities: "var(--category-facilities)",
  access: "var(--category-access)",
};