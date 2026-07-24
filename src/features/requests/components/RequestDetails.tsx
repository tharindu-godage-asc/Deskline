/**
 * Step 6: RequestDetail displays the details of a single support request.
 *
 * During the initial development stage, the component renders a
 * request from the fixture data to establish the basic detail page
 * layout. It presents key request information such as the title,
 * status, priority, category, requester, and assignee. Future
 * iterations will retrieve request data dynamically based on the
 * selected request and support additional interactions.
 */

import { requests } from "../../../shared/fixtures/requests";
import { Badge } from "../../../shared/ui/badge/Badge";
import { Card } from "../../../shared/ui/Card";

export function RequestDetail() {
  const request = requests[1];

  return (
    <Card>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Request ID: {request.id}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {request.title}
            </h2>
          </div>

          <Badge variant={request.status}>
            {request.status}
          </Badge>
        </div>

        {/* Request Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Priority
            </p>
            <p className="mt-1 font-medium capitalize">
              {request.priority}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Category
            </p>
            <p className="mt-1 font-medium capitalize">
              {request.category}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Requester
            </p>
            <p className="mt-1 font-medium">
              {request.requesterId}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Assignee
            </p>
            <p className="mt-1 font-medium">
              {request.assigneeId}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Created At
          </p>

          <p className="mt-1 text-sm">
            {request.createdAt}
          </p>
        </div>
      </div>
    </Card>
  );
}