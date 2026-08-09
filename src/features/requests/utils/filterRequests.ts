import { type Request } from "../../../shared/types/index";
import { type RequestFilters } from "../../../shared/types/filters";

export function filterRequests(
  requests: Request[],
  filters: RequestFilters,
  currentUserId: string
) {
  return requests.filter((request) => {
    const matchesSearch =
      request.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" ||
      request.status === filters.status;

    const matchesPriority =
      filters.priority === "all" ||
      request.priority === filters.priority;

    const matchesCategory =
      filters.category === "all" ||
      request.category === filters.category;

    const matchesAssignee =
      filters.assignee === undefined ||
      filters.assignee === "all" ||
      (filters.assignee === "unassigned" &&
        request.assigneeId === null) ||
      (filters.assignee === "me" &&
        request.assigneeId === currentUserId);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory &&
      matchesAssignee
    );
  });
}

export type SortOption =
  | "updatedAt-desc"
  | "updatedAt-asc"
  | "priority-desc"
  | "priority-asc";

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

export function sortRequests(
  requests: Request[],
  sortBy: SortOption
) {
  return [...requests].sort((a, b) => {
    switch (sortBy) {
      case "updatedAt-desc":
        return (
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
        );

      case "updatedAt-asc":
        return (
          new Date(a.updatedAt).getTime() -
          new Date(b.updatedAt).getTime()
        );

      case "priority-desc":
        return (
          priorityOrder[b.priority] -
          priorityOrder[a.priority]
        );

      case "priority-asc":
        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );

      default:
        return 0;
    }
  });
}