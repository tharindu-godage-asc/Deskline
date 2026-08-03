import { useState, useEffect, useMemo } from "react";
import { useSearchParams} from "react-router-dom";

import { getRequests } from "../../../shared/api/requestApi";
import type { Request } from "../../../shared/types/request";
import { RequestList } from "../components/RequestList";
import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { filterRequests } from "../utils/filterRequests";
import { useAuth } from "../../../shared/context/AuthContext";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { LoadingState } from "../components/states/LoadingState";
import { ErrorState } from "../components/states/ErrorState";

import {type RequestFilters, DEFAULT_REQUEST_FILTERS} from "../../../shared/types/filters";

// import { getUsers } from "../../../shared/api/userApi"     --For testing with useEffect
//import { getRequests } from "../../../shared/api/requestApi";   --For testing with useEffect

export function QueuePage() {

  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = (searchParams.get("status") as RequestFilters["status"]) || "all";
  const [filters, setFilters] = useState<RequestFilters>({
    ...DEFAULT_REQUEST_FILTERS,
    status: initialStatus,
  });
  const debouncedSearch =
    useDebounce(
      filters.search,
      300
    );
  const [requests, setRequests] = useState<Request[]>([]);

  const filteredRequests = useMemo(
  () =>
    filterRequests(
      requests,
      {
      ...filters,
      search: debouncedSearch
      },
      currentUser.id

    ),
  [
    debouncedSearch,
    filters.assignee,
    filters.status,
    filters.priority,
    filters.category,
      requests,
    currentUser.id,
  ]
);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadRequests() {
      try {
        setLoading(true);
        // await new Promise((resolve) =>
        //   setTimeout(resolve, 2000)
        // ); --------------------------------->> For Testing Loader

        setError(false);

        const data =
          await getRequests(
            currentUser.id
          );

        // throw new Error();

        setRequests(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, [currentUser.id]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (filters.status === "all"){
      params.delete("status")
    } else {
      params.set("status", filters.status);
    }
    setSearchParams(params);
  }, [filters.status, searchParams, setSearchParams]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

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