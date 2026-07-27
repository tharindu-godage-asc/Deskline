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
import { Button } from "../../../shared/ui/button/Button";
import { Card } from "../../../shared/ui/Card";
import { useAuth } from "../../../shared/context/AuthContext";
import { canCancelRequest, canAssignToMe, canSetPending, canCloseRequest, canReassign, canComment, canViewRequest } from "../../../shared/lib/permissions";
import { useState } from "react";
import { users } from "../../../shared/api/auth";


interface Props {
  request: (typeof requests)[number];
}

export function RequestDetail({ request }: Props) {
  const [selectedAssignee, setSelectedAssignee] =
  useState("");

  const { currentUser } = useAuth();

  if (
      currentUser &&
      !canViewRequest(
        currentUser.role,
        request.requesterId,
        currentUser.id
      )
    ) {
      return (
        <Card>
          <p className="text-red-500">
            You do not have permission to view this request.
          </p>
        </Card>
      );
    }

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

        {/* Actions */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Actions
              </h3>

              <div className="flex gap-2">
                {currentUser &&
                  canCancelRequest(
                    currentUser.role,
                    request.requesterId,
                    currentUser.id,
                    request.status
                  ) && (
                    <Button variant="danger">
                      Cancel Request
                    </Button>
                  )}

                  {currentUser &&
                    canAssignToMe(
                      currentUser.role
                    ) &&
                    request.assigneeId !==
                      currentUser.id && (
                      <Button variant="secondary">
                        Assign To Me
                      </Button>
                    )}

                    {currentUser &&
                    canSetPending(
                      currentUser.role
                    ) &&
                    request.status === "open" && (
                      <Button variant="secondary">
                        Set Pending
                      </Button>
                    )}

                    {currentUser &&
                      canCloseRequest(
                        currentUser.role,
                        request.status
                      ) && (
                        <Button variant="danger">
                          Close Request
                        </Button>
                      )}

                      {currentUser &&
                        canReassign(
                          currentUser.role
                        ) && (
                          <div className="flex items-center gap-2">
                            <select
                              value={selectedAssignee}
                              onChange={(e) =>
                                setSelectedAssignee(
                                  e.target.value
                                )
                              }
                              className="rounded-md border px-3 py-2"
                            >
                              <option value="">
                                Select Assignee
                              </option>

                              {users
                                .filter((user) => user.id !== request.assigneeId)
                                .map((user) => (
                                  <option
                                    key={user.id}
                                    value={user.id}
                                  >
                                    {user.name}
                                  </option>
                                ))}
                            </select>

                            <Button>
                              Reassign
                            </Button>
                          </div>
                        )}
              </div>
            </div>
          </div>


          {/*Comments Section */}
      <div className="border-t pt-4">
        <h3 className="mb-3 font-semibold">
          Comments
        </h3>

          {currentUser &&
            canComment(
              currentUser.role,
              request.requesterId,
              currentUser.id,
              request.status
            ) ? (
              <div className="space-y-3">
                <textarea
                  className="w-full rounded-md border p-3"
                  rows={4}
                  placeholder="Add a comment..."
                />

                <Button>
                  Add Comment
                </Button>
              </div>
            ) : (
              <p className="text-sm opacity-70">
                Comments are disabled because this request
                is closed or you do not have permission to
                comment on it.
              </p>
            )}
        </div>

        {/* Timeline */}
        <div className="border-t pt-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Created At
              </p>

              <p className="mt-1 text-sm">
                {request.createdAt}
              </p>
            </div>

            <Button
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Back to Requests
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
