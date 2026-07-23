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