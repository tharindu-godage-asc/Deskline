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

import type { User, Request } from "../../../shared/types";

import { requests } from "../../../shared/fixtures/requests";

export function createRequest(
  currentUser: User,
  request: Request
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
  currentUser: User,
  request: Request
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
  currentUser: User,
  request: Request
) {
  if (
    !canAssignToMe(
      currentUser.role,
      request.status
    )
  ) {
    throw new ForbiddenError(
      "You do not have permission to assign requests."
    );
  }
}

export function setPending(
  currentUser: User,
  request: Request
) {
  if (
    !canSetPending(
      currentUser.role,
      request.status
    )
  ) {
    throw new ForbiddenError(
      "You do not have permission to change status."
    );
  }
}

export function closeRequest(
  currentUser: User,
  request: Request
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
  currentUser: User,
  request: Request
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