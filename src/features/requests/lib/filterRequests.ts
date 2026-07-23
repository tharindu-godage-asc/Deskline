import type { Request } from "../../../shared/types";
import type { RequestFilters } from "../../../shared/types/filters";

export function filterRequests(
  requests: Request[],
  filters: RequestFilters
) {
  return requests.filter((request) => {
    const searchMatch =
      request.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const statusMatch =
      filters.status === "all" ||
      request.status === filters.status;

    const priorityMatch =
      filters.priority === "all" ||
      request.priority === filters.priority;

    const categoryMatch =
      filters.category === "all" ||
      request.category === filters.category;

    return (
      searchMatch &&
      statusMatch &&
      priorityMatch &&
      categoryMatch
    );
  });
}