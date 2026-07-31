import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { RequestList } from "../components/RequestList";
import type { RequestFilters } from "../../../shared/types/filters";
import { useState, useMemo, useEffect} from "react";
import { filterRequests } from "../utils/filterRequests";
import { getRequests } from "../../../shared/api/requestApi";
import type { Request } from "../../../shared/types";
import { useAuth } from "../../../shared/context/AuthContext";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { DEFAULT_REQUEST_FILTERS } from "../../../shared/types/filters";
import { LoadingState } from "../components/states/LoadingState";
import { ErrorState } from "../components/states/ErrorState";

export function MyRequestsPage() {
  const [filters, setFilters] = useState<RequestFilters>(
     DEFAULT_REQUEST_FILTERS
  );
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  console.log(
  "Requests State:",
  requests
);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const debouncedSearch =
    useDebounce(
      filters.search,
      300
    );


  const filteredRequests = useMemo(() => {
    return filterRequests(
      requests,
      {
        ...filters,
        search: debouncedSearch,
      },
      currentUser.id
    );
  }, [
      requests,
      debouncedSearch,
      filters.assignee,
      filters.status,
      filters.priority,
      filters.category,
      currentUser.id,
  ]);

  useEffect(() => {
  async function loadRequests() {
    try {
      setLoading(true);
      setError(false);

      const data =
        await getRequests(
          currentUser.id
        );
        console.log(
          "Loaded Requests:",
          data
        );

      setRequests(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  loadRequests();
}, [currentUser.id]);

if (loading) {
  return <LoadingState />;
}

if (error) {
  return (
    <ErrorState
      onRetry={() =>
        window.location.reload()
      }
    />
  );
}
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