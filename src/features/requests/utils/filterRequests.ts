import { type Request } from "../../../shared/types/index";
import { type RequestFilters } from "../../../shared/types/filters";

export function filterRequests(
  requests: Request[],
  filters: RequestFilters
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

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory
    );
  });
}