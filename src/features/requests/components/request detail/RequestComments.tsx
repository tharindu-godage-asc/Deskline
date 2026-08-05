import type {
  Message,
  User,
} from "../../../../shared/types";

import { Button } from "../../../../shared/ui/button/Button";

type CommentLike = Message & {
  author?: string;
  message?: string;
};

type Props = {
  comments: CommentLike[];
  users: User[];

  commentText: string;

  setCommentText: (
    value: string
  ) => void;

  handleAddComment: () => void;

  isSubmittingComment: boolean;

  canComment: boolean;

  reduceMotion: boolean;
};

export default function RequestComments({
  comments,
  users,
  commentText,
  setCommentText,
  handleAddComment,
  isSubmittingComment,
  canComment,
  reduceMotion,
}: Props) {
  return (
    <div className="pt-12">
      <h3 className="mb-3 font-semibold">
        Comments
      </h3>

      {comments.length === 0 ? (
        <p className="text-sm opacity-70">
          No comments yet.
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => {
            const author = comment.authorId
              ? users.find(
                  (user) =>
                    user.id ===
                    comment.authorId
                )?.name
              : comment.author;

            return (
              <div
                key={comment.id}
                className="rounded-lg border p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {author ??
                      "Unknown User"}
                  </p>

                  <p className="text-xs opacity-70">
                    {comment.createdAt}
                  </p>
                </div>

                <p className="mt-2 text-sm">
                  {comment.body ??
                    comment.message}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        {canComment ? (
          <div className="space-y-3">
            <textarea
              className="w-full rounded-md border p-3"
              rows={4}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) =>
                setCommentText(
                  e.target.value
                )
              }
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
            Comments are disabled because
            this request is closed or you
            do not have permission to
            comment on it.
          </p>
        )}
      </div>
    </div>
  );
}