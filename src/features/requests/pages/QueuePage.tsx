import { useState, useEffect } from "react";
import { useSearchParams} from "react-router-dom";

import { requests} from "../../../shared/fixtures/requests";
import { RequestList } from "../components/RequestList";
import { RequestFilters as RequestFiltersComponent } from "../components/RequestFilters";
import { filterRequests } from "../utils/filterRequests";
import { useAuth } from "../../../shared/context/AuthContext";

import {type RequestFilters, DEFAULT_REQUEST_FILTERS} from "../../../shared/types/filters";



export function QueuePage() {

  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialStatus = (searchParams.get("status") as RequestFilters["status"]) || "all";
  
  const [filters, setFilters] = useState<RequestFilters>({
    ...DEFAULT_REQUEST_FILTERS,
    status: initialStatus,
  });

  const filteredRequests = filterRequests(
    requests,
    filters,
    currentUser.id
  );

  


  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (filters.status === "all"){
      params.delete("status")
    } else {
      params.set("status", filters.status);
    }

    setSearchParams(params);
  }, [filters.status, searchParams, setSearchParams]);


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