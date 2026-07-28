import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { RequestList } from "../components/RequestList";
import type { RequestFilters } from "../../../shared/types/filters";
import { useState} from "react";
import { filterRequests } from "../utils/filterRequests";
import { requests } from "../../../shared/fixtures/requests";
import { useAuth } from "../../../shared/context/AuthContext";
import { DEFAULT_REQUEST_FILTERS } from "../../../shared/types/filters";

export function MyRequestsPage() {
  const [filters, setFilters] = useState<RequestFilters>(
     DEFAULT_REQUEST_FILTERS
  );

  const { currentUser } = useAuth();


  const filteredRequests = filterRequests(
    requests,
    filters,
    currentUser.id
  );

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