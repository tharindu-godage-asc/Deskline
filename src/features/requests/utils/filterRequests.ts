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