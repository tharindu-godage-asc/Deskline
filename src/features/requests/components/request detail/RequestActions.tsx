import type { Request, User } from "../../../../shared/types";
import { Button } from "../../../../shared/ui/button/Button";
import { ConfirmDialog } from "../../../../shared/ui/modal/ConfirmDialog";
import {
  canCancelRequest,
  canAssignToMe,
  canSetPending,
  canCloseRequest,
  canReassign,
} from "../../../../shared/lib/permissions";
import { updateRequest } from "../../../../shared/api/requestApi";
import { useToast } from "../../../../shared/context/ToastContext";

type Props = {
  request: Request;
  currentUser: User;

  users: User[];

  selectedAssignee: string;
  setSelectedAssignee: (
    value: string
  ) => void;

  isReassigning: boolean;
  setIsReassigning: (
    value: boolean
  ) => void;

  confirmAction:
    | "cancel"
    | "close"
    | null;

  setConfirmAction: (
    action:
      | "cancel"
      | "close"
      | null
  ) => void;
};

export function RequestActions({
  request,
  currentUser,
  users,
  selectedAssignee,
  setSelectedAssignee,
  isReassigning,
  setIsReassigning,
  confirmAction,
  setConfirmAction,
}: Props) {
  const { showToast } =
    useToast();

  return (
    <>
      {/* Actions */}

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        Actions
                      </h3>
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
                            {!selectedAssignee && (
                                      <p className="text-right mt-1 text-sm text-gray-400">
                                        Select an assignee to enable reassign.
                                      </p>
                                    )}

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
    </>
  );
}