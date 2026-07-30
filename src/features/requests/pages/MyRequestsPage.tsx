import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { RequestList } from "../components/RequestList";
import type { RequestFilters } from "../../../shared/types/filters";
import { useState, useMemo} from "react";
import { filterRequests } from "../utils/filterRequests";
import { requests } from "../../../shared/fixtures/requests";
import { useAuth } from "../../../shared/context/AuthContext";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { DEFAULT_REQUEST_FILTERS } from "../../../shared/types/filters";

export function MyRequestsPage() {
  const [filters, setFilters] = useState<RequestFilters>(
     DEFAULT_REQUEST_FILTERS
  );

  const { currentUser } = useAuth();

  const debouncedSearch =
    useDebounce(
      filters.search,
      300
    );

const filteredRequests = useMemo(() => {
  console.log(
    "Filtering:",
    debouncedSearch,
    new Date().toLocaleTimeString()
  );

  return filterRequests(
    requests,
    {
      ...filters,
      search: debouncedSearch,
    },
    currentUser.id
  );
}, [
    debouncedSearch,
    filters.assignee,
    filters.status,
    filters.priority,
    filters.category,
    currentUser.id,
]);

// console.log("Current User ID:", currentUser.id);

// console.log(
//   "My Requests:",
//   requests.filter(
//     (request) =>
//       request.requesterId === currentUser.id
//   )
// );
// console.log("Filters:", filters);

// console.log("Current User:", currentUser.id);
// console.log("Requests Before Filter:", requests);

// console.log(
//   "Filtered Requests:",
//   filteredRequests
// );

// const filteredRequests = useMemo(() => {
//   console.log("Filtering requests...");

//   return filterRequests(
//     requests,
//     filters,
//     currentUser.id
//   );
// }, [
//   filters,
//   currentUser.id,
// ]);
  return (
    <>
      <RequestFiltersComponent
        filters={filters}
        onChange={setFilters}
      />

      <RequestList requests={filteredRequests} />
    </>
  );
}