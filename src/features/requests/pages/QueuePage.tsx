import { requests } from "../../../shared/fixtures/requests";
import { RequestList } from "../components/RequestList";
import { useState } from "react";
import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { filterRequests } from "../utils/filterRequests";
import {type RequestFilters, DEFAULT_REQUEST_FILTERS,
} from "../../../shared/types/filters";



export function QueuePage() {
  const [filters, setFilters] = useState<RequestFilters>(
    DEFAULT_REQUEST_FILTERS
  );

  const filteredRequests = filterRequests(
    requests,
    filters
  );

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