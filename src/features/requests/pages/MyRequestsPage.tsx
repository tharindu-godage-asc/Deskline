import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { RequestList } from "../components/RequestList";
import { useState, type ComponentProps } from "react";
import { filterRequests } from "../utils/filterRequests";
import { requests } from "../../../shared/fixtures/requests";

export function MyRequestsPage() {
  const [filters, setFilters] = useState<
    ComponentProps<typeof RequestFiltersComponent>["filters"]
  >({
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