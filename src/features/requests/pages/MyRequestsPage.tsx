import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { RequestList } from "../components/RequestList";
import type { RequestFilters } from "../../../shared/types/filters";
import { useState} from "react";
import { filterRequests } from "../utils/filterRequests";
import { requests } from "../../../shared/fixtures/requests";

export function MyRequestsPage() {
  const [filters, setFilters] = useState<RequestFilters>({
    search: "",
    status: "all",
    priority: "all",
    category: "all",
  });

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