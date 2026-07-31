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

import { Badge } from "../../../shared/ui/badge/Badge";
import { Button } from "../../../shared/ui/button/Button";
import { Card } from "../../../shared/ui/Card";

import { useAuth } from "../../../shared/context/AuthContext";
import { canCancelRequest, canAssignToMe, canSetPending, canCloseRequest, canReassign, canComment, canViewRequest } from "../../../shared/lib/permissions";
import { cancelRequest, assignToMe, setPending, reassignRequest, closeRequest } from "../api/requestActions";
import { useState, useEffect } from "react";
import { useMotion } from "../../../shared/hooks/useMotion";
import { useMemo } from "react";

import { getUsers } from "../../../shared/api/userApi";
import { ConfirmDialog } from "../../../shared/ui/modal/ConfirmDialog";

interface Props {
  request: any;
  messages: any[];
}

export function RequestDetail({
  request,
  messages,
}: Props) {
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const requester = useMemo(
    () =>
      users.find(
        (user) =>
          user.id === request.requesterId
      ),
    [users, request.requesterId]
  );

  const assignee = useMemo(
    () =>
      users.find(
        (user) =>
          user.id === request.assigneeId
      ),
    [users, request.assigneeId]
  );
  const [confirmAction, setConfirmAction] =useState<"cancel" | "close" | null>(null);

  const [comments, setComments] = useState(messages);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { reduceMotion } = useMotion();

  useEffect(() => {
  async function loadUsers() {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.error(
        "Failed to load users",
        error
      );
    }
  }

  loadUsers();
}, []);

  useEffect(() => {
    setComments(messages);
  }, [messages]);

  const handleAddComment = async () => {
    if (
      !commentText.trim() ||
      !currentUser ||
      isSubmittingComment
    ) {
      return;
    }

    setIsSubmittingComment(true);

    try {
      // Simulate API request
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const newComment = {
        id: crypto.randomUUID(),
        requestId: request.id,
        author: currentUser.name,
        message: commentText,
        createdAt: new Date().toLocaleString(),
      };

      setComments((prev) => [
        ...prev,
        newComment,
      ]);

      setCommentText("");
    } finally {
      setIsSubmittingComment(false);
    }
  };

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

          <Badge variant={request.status} size="lg">
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
              {requester?.name ?? "Unknown User"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Assignee
            </p>
            <p className="mt-1 font-medium">
              {assignee?.name ?? "Unassigned"}
            </p>
          </div>
        </div>

        {/* Actions */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Actions
              </h3>


{/* /////-----------------------------Testing Purposes Only----------------------------\\\\\ */}

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              try {
                cancelRequest(
                  currentUser,
                  request
                );
                console.log({
                  role: currentUser.role,
                  requesterId: request.requesterId,
                  currentUserId: currentUser.id,
                  status: request.status,
                });

                console.log(
                  canCancelRequest(
                    currentUser.role,
                    request.requesterId,

                    
                    currentUser.id,
                    request.status
                  )
                );
              } catch (error) {
                alert(
                  (error as Error).message
                );
              }
            }}
          >
            TEST CANCEL
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              try {
                assignToMe(
                  currentUser,
                  request
                );
              } catch (error) {
                alert(
                  (error as Error).message
                );
              }
            }}
          >
            TEST ASSIGN
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              try {
                setPending(
                  currentUser,
                  request
                );
              } catch (error) {
                alert(
                  (error as Error).message
                );
              }
            }}
          >
            TEST PENDING
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              try {
                closeRequest(
                  currentUser,
                  request
                );
              } catch (error) {
                alert(
                  (error as Error).message
                );
              }
            }}
          >
            TEST CLOSE
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              try {
                reassignRequest(
                  currentUser,
                  request,
                  "user-2"
                );
              } catch (error) {
                alert(
                  (error as Error).message
                );
              }
            }}
          >
            TEST REASSIGN
          </Button>
        </div>

{/* /////--------------------------------------------------------------------------------\\\\\ */}


              <div className="flex gap-2">

            {/* CancelRequest */}
                {currentUser &&
                  canCancelRequest(
                    currentUser.role,
                    request.requesterId,
                    currentUser.id,
                    request.status
                  ) && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        setConfirmAction("cancel")
                      }
                    >
                      Cancel Request
                    </Button>
                  )}

            {/* AssignToMe */}
                  {currentUser &&
                    canAssignToMe(
                      currentUser.role
                    ) &&
                    request.assigneeId !==
                      currentUser.id && (
                      <Button 
                        variant="secondary"
                        onClick={() => {
                            try {
                              assignToMe(
                                currentUser,
                                request
                              );
                            } catch (error) {
                              alert(
                                (error as Error).message
                              );
                            }
                          }}>
                        Assign To Me
                      </Button>
                    )}

            {/* SetPending */}
                    {currentUser &&
                    canSetPending(
                      currentUser.role
                    ) &&
                    request.status === "open" && (
                      <Button 
                        variant="secondary"
                        onClick={() => {
                              try {
                                setPending(
                                  currentUser,
                                  request
                                );
                              } catch (error) {
                                alert(
                                  (error as Error).message
                                );
                              }
                          }}>
                        Set Pending
                      </Button>
                    )}

            {/* CloseRequest */}
                    {currentUser &&
                      canCloseRequest(
                        currentUser.role,
                        request.status
                      ) && (
                        <Button
                          variant="danger"
                          onClick={() =>
                            setConfirmAction("close")
                          }
                        >
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
                                .filter(
                                  (user) =>
                                    user.role === "technician" ||
                                    user.role === "admin"
                                )
                                .filter(
                                  (user) =>
                                    user.id !== request.assigneeId
                                )
                                .map((user) => (
                                  <option
                                    key={user.id}
                                    value={user.id}
                                  >
                                    {user.name}
                                  </option>
                                ))}
                            </select>

                            <Button 
                              onClick={() => {
                                try {
                                  reassignRequest(
                                    currentUser,
                                    request,
                                    selectedAssignee
                                  );
                                } catch (error) {
                                  alert(
                                    (error as Error).message
                                  );
                                }
                              }}>
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
          
          {comments.length === 0 ? (
            <p className="text-sm opacity-70">
              No comments yet.
            </p>
          ) : (
                    <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border p-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {comment.author}
                </p>

                <p className="text-xs opacity-70">
                  {comment.createdAt}
                </p>
              </div>

              <p className="mt-2 text-sm">
                {comment.message}
              </p>
            </div>
          ))}
        </div>
          )}
  

        {/* Message Thread */}
      <div className="border-t pt-4">
        <h3 className="mb-3 font-semibold">
          Activity
        </h3>


      </div>

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
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />

                <Button
                  onClick={handleAddComment}
                  disabled={
                    isSubmittingComment ||
                    !commentText.trim()
                  }
                >
                 {isSubmittingComment ? (
                    <span className="flex items-center gap-2">
                      <span
                        className={
                          reduceMotion
                            ? ""
                            : "h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                        }
                      />

                      Submitting...
                    </span>
                  ) : (
                    "Add Comment"
                  )}
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

        <ConfirmDialog
          isOpen={confirmAction !== null}
          title={
            confirmAction === "cancel"
              ? "Cancel Request"
              : "Close Request"
          }
          message={
            confirmAction === "cancel"
              ? "Are you sure you want to cancel this request?"
              : "Are you sure you want to close this request?"
          }
          onConfirm={() => {
            try {
              if (
                confirmAction === "cancel"
              ) {
                cancelRequest(
                  currentUser,
                  request
                );
              }

              if (
                confirmAction === "close"
              ) {
                closeRequest(
                  currentUser,
                  request
                );
              }
            } catch (error) {
              alert(
                (error as Error).message
              );
            }

            setConfirmAction(null);
          }}
          onCancel={() =>
            setConfirmAction(null)
          }
        />

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
