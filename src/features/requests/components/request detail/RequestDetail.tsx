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
import { useState, useEffect } from "react";
import { useMotion } from "../../../../shared/hooks/useMotion";
import { useMemo } from "react";
import { getUsers } from "../../../../shared/api/userApi";
import { addComment } from "../../../../shared/api/requestApi";
import { useToast } from "../../../../shared/context/ToastContext";
import { RequestActions } from "./RequestActions";
import { canViewRequest, canComment } from "../../../../shared/lib/permissions";

import RequestDetailHeader from "./RequestDetailHeader";
import RequestComments from "./RequestComments";

import type { Message } from "../../../../shared/types/message";
import type { Request } from "../../../../shared/types/request";

interface Props {
  request: Request;
  messages: Message[];
}

export function RequestDetail({
  request,
  messages,
}: Props) {
  const [requestState, setRequestState] = useState<Request>(request);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const requester = useMemo(
    () =>
      users.find(
        (user) =>
          user.id === requestState.requesterId
      ),
    [users, requestState.requesterId]
  );
  const { showToast } = useToast();
  const assignee = useMemo(
    () =>
      users.find(
        (user) =>
          user.id === requestState.assigneeId
      ),
    [users, requestState.assigneeId]
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

  useEffect(() => {
    setRequestState(request);
  }, [request]);

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
        requestState.id,
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

//  if (
//       currentUser &&
//       !canViewRequest(
//         currentUser.role,
//         request.requesterId,
//         currentUser.id
//       )
//     ) {
//       return (
//         <Card>
//           <p className="text-red-500">
//             You do not have permission to view this request.
//           </p>
//         </Card>
//       );
//     }

  return (
    <Card>
      <div className="space-y-6">

        {/* Header */}
        <RequestDetailHeader
          request={requestState}
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
          isSubmittingComment={isSubmittingComment}
          canComment={canComment(
            currentUser.role,
            requestState.requesterId,
            currentUser.id,
            requestState.status
          )}
          reduceMotion={reduceMotion}
        />




{/* /////-----------------------------Testing Purposes Only----------------------------\\\\\ */}

{/* /////--------------------------------------------------------------------------------\\\\\ */}

        {/* Actions */}
        <RequestActions
          request={requestState}
          currentUser={currentUser}
          users={users}
          selectedAssignee={selectedAssignee}
          setSelectedAssignee={setSelectedAssignee}
          isReassigning={isReassigning}
          setIsReassigning={setIsReassigning}
          confirmAction={confirmAction}
          setConfirmAction={setConfirmAction}
          onRequestUpdated={setRequestState}
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
