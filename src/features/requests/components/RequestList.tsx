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
import { isRequester } from "../../../shared/lib/permissions";
import { useAuth } from "../../../shared/context/AuthContext";

type Props = {
  requests: Request[];
};

export function RequestList({
  requests,
}: Props) {

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleViewDetails = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  }

  const handleNewRequest = () => {
    navigate("/requests/new");
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