/**
 * Step 5: RequestList displays a collection of support requests using
 * fixture data during the initial development stage.
 *
 * It provides a simple overview of each request, including its
 * title, status, priority, and category. This component will
 * later be extended to consume data from the application's API,
 * support filtering and searching, and include additional
 * request actions.
 */

import type { Request } from "../../../shared/types";
import { RequestListItem } from "./RequestListItem";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/button/Button";
import { getCurrentUser } from "../../../shared/api/auth";
import { isRequester } from "../../../shared/lib/permissions";
import { useState } from "react";
import { LoadingState } from "../components/states/LoadingState";
import { EmptyState } from "../components/states/EmptyState";
import { ErrorState } from "./states/ErrorState";


type Props = {
  requests: Request[];
};

export function RequestList({
  requests,
}: Props) {

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const [loading] = useState(false);
  const [error, setError] = useState(false);

  const handleViewDetails = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  }

  const handleNewRequest = () => {
    navigate("/requests/new");
  }

  if (loading) return <LoadingState />;

  if (requests.length === 0)
  return (
    <EmptyState title="No requests" message="There are no requests." />
  );

  if (error) {
  return (
    <ErrorState
      onRetry={() =>
        setError(false)
      }
    />
  );
}
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mt-5">
        <h2 className="text-xl font-semibold">
          Requests
        </h2>

        {isRequester(currentUser.role) && (
          <Button
            className="mr-4"
            variant="primary"
            onClick={handleNewRequest}
          >
            New Request
          </Button>
        )}
      </div>

      {requests.map((request) => (
        <RequestListItem
          key={request.id}
          request={request}
          onViewDetails={
            handleViewDetails
          }
        />
      ))}
    </div>
  );
}