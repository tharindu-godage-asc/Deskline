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

type Props = {
  requests: Request[];
};

export function RequestList({
  requests,
}: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">
        Requests
      </h2>

      {requests.map((request) => (
        <Card key={request.id}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                {request.title}
              </h3>

              <p className="text-sm opacity-70">
                {request.category} • {request.priority}
              </p>
            </div>

            <Badge variant={request.status}>
              {request.status}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}