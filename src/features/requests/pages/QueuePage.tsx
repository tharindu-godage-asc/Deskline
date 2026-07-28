import { requests} from "../../../shared/fixtures/requests";
import { RequestList } from "../components/RequestList";
import { useState } from "react";
import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { filterRequests } from "../utils/filterRequests";
import { useAuth } from "../../../shared/context/AuthContext";
import {type RequestFilters, DEFAULT_REQUEST_FILTERS,
} from "../../../shared/types/filters";



export function QueuePage() {
  const { currentUser } = useAuth();
  const [filters, setFilters] = useState<RequestFilters>(
    DEFAULT_REQUEST_FILTERS
  );

  const filteredRequests = filterRequests(
    requests,
    filters,
    currentUser.id
  );

  return (
    <>
      <RequestFiltersComponent
        filters={filters}
        onChange={setFilters}
        showAssignee
      />
      <RequestList requests={filteredRequests} />
    </>
  );
}