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
import { Card } from "../../../shared/ui/Card";
import { Badge } from "../../../shared/ui/badge/Badge";
import {useNavigate} from "react-router-dom";
import { Button } from "../../../shared/ui/button/Button";
import { getCurrentUser } from "../../../shared/api/auth";
import { isRequester } from "../../../shared/lib/permissions";

type Props = {
  requests: Request[];
};

export function RequestList({
  requests,
}: Props) {

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

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
        <Card key={request.id}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold">
                {request.title}
              </h3>

              <p className="text-sm opacity-70">
                {request.category} • {request.priority}
              </p>

              <div>
                <Badge variant={request.status}>
                  {request.status}
                </Badge>
              </div>
            </div>



            <Button variant="secondary"
            onClick={() => handleViewDetails(request.id)}>
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}