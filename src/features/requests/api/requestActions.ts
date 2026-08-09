import {
  ForbiddenError,
} from "../../../shared/api/errors";

import {
  canCloseRequest,
  canCancelRequest,
  canAssignToMe,
  canSetPending,
  canReassign,
  canCreateRequest
} from "../../../shared/lib/permissions";

import { requests } from "../../../shared/fixtures/requests";

export function createRequest(
  currentUser: any,
  request: any
) {
  if (
    !canCreateRequest(
      currentUser.role
    )
  ) {
    throw new ForbiddenError(
      "You do not have permission to create requests."
    );
  }

  requests.unshift(request);
  return request;
}

export function cancelRequest(
  currentUser: any,
  request: any
) {
  const allowed =
    canCancelRequest(
      currentUser.role,
      request.requesterId,
      currentUser.id,
      request.status
    );

  if (!allowed) {
    throw new ForbiddenError(
      "You do not have permission to cancel this request."
    );
  }
}

export function assignToMe(
  currentUser: any,
  request: any
) {
  if (
    !canAssignToMe(
      currentUser.role
    )
  ) {
    throw new ForbiddenError(
      "You do not have permission to assign requests."
    );
  }
}

export function setPending(
  currentUser: any,
  request: any
) {
  if (
    !canSetPending(
      currentUser.role
    )
  ) {
    throw new ForbiddenError(
      "You do not have permission to change status."
    );
  }
}

export function closeRequest(
  currentUser: any,
  request: any
) {
  if (
    !canCloseRequest(
      currentUser.role,
      request.status
    )
  ) {
    throw new ForbiddenError(
      "You do not have permission to close requests."
    );
  }
}

export function reassignRequest(
  currentUser: any,
  request: any,
  assigneeId: string
) {
  if (
    !canReassign(
      currentUser.role,
      request.status
    )
  ) {
    throw new ForbiddenError(
      "You do not have permission to reassign requests."
    );
  }
}