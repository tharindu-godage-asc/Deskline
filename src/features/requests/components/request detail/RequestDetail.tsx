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

import { Button } from "../../../../shared/ui/button/Button";
import { Card } from "../../../../shared/ui/Card";

import { useAuth } from "../../../../shared/context/AuthContext";
import { canCancelRequest, canAssignToMe, canSetPending, canCloseRequest, canReassign, canComment, canViewRequest } from "../../../../shared/lib/permissions";
import { useState, useEffect } from "react";
import { useMotion } from "../../../../shared/hooks/useMotion";
import { useMemo } from "react";

import { getUsers } from "../../../../shared/api/userApi";
import { addComment } from "../../../../shared/api/requestApi";
import { updateRequest } from "../../../../shared/api/requestApi";
import { useToast } from "../../../../shared/context/ToastContext";
import { ConfirmDialog } from "../../../../shared/ui/modal/ConfirmDialog";

import RequestDetailHeader from "./RequestDetailHeader";
import RequestComments from "./RequestComments";

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
  const { showToast } = useToast();

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
  const [ isReassigning,setIsReassigning] = useState(false);

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
    console.log("Submitting comment", {
  authorId: currentUser.id,
  body: commentText,
});

    try {
      const newComment = await addComment(
        request.id,
        {
          authorId: currentUser.id,
          body: commentText,
        }
      );

      setComments((prev) => [
        ...prev,
        newComment,
      ]);

      setCommentText("");

      showToast(
        "Comment added.",
        "success"
      );
    } catch {
      showToast(
        "Failed to add comment.",
        "error"
      );
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
        <RequestDetailHeader
          request={request}
          requesterName={
            requester?.name ??
            "Unknown User"
          }
          assigneeName={
            assignee?.name ??
            "Unassigned"
          }
        />

      {/*Comments Section */}
        <RequestComments
          comments={comments}
          users={users}
          commentText={commentText}
          setCommentText={setCommentText}
          handleAddComment={handleAddComment}
          isSubmittingComment={
            isSubmittingComment
          }
          canComment={canComment(
            currentUser.role,
            request.requesterId,
            currentUser.id,
            request.status
          )}
          reduceMotion={reduceMotion}
        />

        {/* Actions */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Actions
              </h3>


{/* /////-----------------------------Testing Purposes Only----------------------------\\\\\ */}

        <div className="flex gap-2">
          {/* <Button
            variant="secondary"
            onClick={async () => {
              try {
                const updatedRequest =
                  await updateRequest(
                    request.id,
                    {
                      status: "cancelled",
                    },
                    currentUser.id
                  );

                console.log(
                  "Cancelled Request:",
                  updatedRequest
                );

                showToast(
                  "Request cancelled.",
                  "success"
                );
              } catch (error) {
                console.error(error);

                showToast(
                  "Failed to cancel request.",
                  "error"
                );
              }
            }}
          >
          CANCEL
        </Button> */}

          {/* <Button
            onClick={async () => {
              try {
                await updateRequest(
                  request.id,
                  {
                    assigneeId:
                      selectedAssignee,
                  },
                  currentUser.id
                );

                showToast(
                  "Request reassigned.",
                  "success"
                );
              } catch {
                showToast(
                  "Failed to reassign request.",
                  "error"
                );
              }
            }}
          >
            Reassign
          </Button> */}

            {/* <Button
              variant="secondary"
              onClick={async () => {
                try {
                  await updateRequest(
                    request.id,
                    {
                      status: "pending",
                    },
                    currentUser.id
                  );

                  showToast(
                    "Request moved to pending.",
                    "success"
                  );
                } catch {
                  showToast(
                    "Failed to update request.",
                    "error"
                  );
                }
              }}
            >
              Set Pending
            </Button> */}

            {/* <Button
              variant="secondary"
              onClick={async () => {
                try {
                  await updateRequest(
                    request.id,
                    {
                      status: "open",
                    },
                    currentUser.id
                  );

                  showToast(
                    "Request updated.",
                    "success"
                  );
                } catch {
                  showToast(
                    "Failed to update request.",
                    "error"
                  );
                }
              }}
            >
              Set Open
            </Button> */}

          {/* <Button
            variant="secondary"
            onClick={async () => {
              try {
                const updatedRequest =
                  await updateRequest(
                    request.id,
                    {
                      status: "closed",
                    },
                    currentUser.id
                  );

                console.log(
                  "Updated Request:",
                  updatedRequest
                );

                showToast(
                  "Request closed.",
                  "success"
                );
              } catch (error) {
                console.error(error);

                showToast(
                  "Failed to close request.",
                  "error"
                );
              }
            }}
          >
            TEST CLOSE
          </Button> */}

          {/* <Button
            variant="secondary"
            onClick={async () => {
              try {
                await updateRequest(
                  request.id,
                  {
                    assigneeId: currentUser.id,
                  },
                  currentUser.id
                );

                showToast(
                  "Request assigned.",
                  "success"
                );
              } catch {
                showToast(
                  "Failed to assign request.",
                  "error"
                );
              }
            }}
          >
            Assign To Me
          </Button> */}
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
                        onClick={async () => {
                          try {
                            await updateRequest(
                              request.id,
                              {
                                assigneeId:
                                  currentUser.id,
                              },
                              currentUser.id
                            );

                            showToast(
                              "Assigned to you.",
                              "success"
                            );
                          } catch {
                            showToast(
                              "Failed to assign request.",
                              "error"
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
                                    onClick={async () => {
                                      try {
                                        await updateRequest(
                                          request.id,
                                          {
                                            status: "pending",
                                          },
                                          currentUser.id
                                        );

                                        showToast(
                                          "Request moved to pending.",
                                          "success"
                                        );
                                      } catch {
                                        showToast(
                                          "Failed to update request.",
                                          "error"
                                        );
                                      }
                                    }}
                                  >
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
                              disabled={
                                !selectedAssignee ||
                                isReassigning
                              }
                              onClick={async () => {
                                try {
                                  setIsReassigning(true);

                                  await updateRequest(
                                    request.id,
                                    {
                                      assigneeId:
                                        selectedAssignee,
                                    },
                                    currentUser.id
                                  );

                                  showToast(
                                    "Request reassigned.",
                                    "success"
                                  );
                                } catch {
                                  showToast(
                                    "Failed to reassign request.",
                                    "error"
                                  );
                                } finally {
                                  setIsReassigning(false);
                                }
                              }}
                            >
                              {isReassigning
                                ? "Reassigning..."
                                : "Reassign"}
                            </Button>
                          </div>
                        )}
              </div>
            </div>
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
          onConfirm={async () => {
            try {
             if (
                    confirmAction === "cancel"
                  ) {
                    await updateRequest(
                      request.id,
                      {
                        status: "cancelled",
                      },
                      currentUser.id
                    );

                    showToast(
                      "Request cancelled.",
                      "success"
                    );
                  }

                  if (
                    confirmAction === "close"
                  ) {
                    await updateRequest(
                      request.id,
                      {
                        status: "closed",
                      },
                      currentUser.id
                    );

                    showToast(
                      "Request closed.",
                      "success"
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
        <div className=" pt-12">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm">
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
