import {
  type Status,
  type Priority,
  type Category,
} from "../types";

export type RequestFilters = {
  search: string;
  status: Status | "all";
  priority: Priority | "all";
  category: Category | "all";
};

type Option<T extends string> = {
  value: T | "all";
  label: string;
};

export const statusOptions: Option<Status>[] = [
  { value: "all", label: "All Statuses" },
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "closed", label: "Closed" },
  { value: "cancelled", label: "Cancelled" },
];

export const priorityOptions: Option<Priority>[] = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const categoryOptions: Option<Category>[] = [
  { value: "all", label: "All Categories" },
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "facilities", label: "Facilities" },
  { value: "access", label: "Access" },
];

export const DEFAULT_REQUEST_FILTERS: RequestFilters = {
  search: "",
  status: "all",
  priority: "all",
  category: "all",
};


