import type { UserRole } from "../types/user";
import type { Status } from "../types";

export function isRequester(
  role: UserRole
) {
  return role === "requester";
}

export function isTechnician(
  role: UserRole
) {
  return role === "technician";
}

export function isAdmin(
  role: UserRole
) {
  return role === "admin";
}

export function isStaff(
  role: UserRole
) {
  return (
    role === "technician" ||
    role === "admin"
  );
}

export function canViewQueue(
  role: UserRole
) {
  return (
    role === "technician" ||
    role === "admin"
  );
}

export function canCreateRequest(
  role: UserRole
) {
  return role === "requester";
}

export function canSetPending(
  role: UserRole
) {
  return (
    role === "technician" ||
    role === "admin"
  );
}

export function canAssignToMe(
  role: UserRole
) {
  return (
    role === "technician" ||
    role === "admin"
  );
}

export function canCloseRequest(
  role: UserRole,
  status: Status
) {
  return (
    role === "admin" &&
    (status === "open" ||
      status === "pending")
  );
}

export function canReassign(
  role: UserRole
) {
  return role === "admin";
}

export function canCancelRequest(
  role: UserRole,
  requesterId: string,
  currentUserId: string,
  status: Status
) {
  return (
    role === "requester" &&
    requesterId === currentUserId &&
    status === "open"
  );
}

export function canComment(
  role: UserRole,
  requesterId: string,
  currentUserId: string,
  status: Status
) {
  const canAccessRequest =
    role === "technician" ||
    role === "admin" ||
    requesterId === currentUserId;

  const canAddComment =
    status === "open" ||
    status === "pending";

  return (
    canAccessRequest &&
    canAddComment
  );
}

export function canViewRequest(
  role: UserRole,
  requesterId: string,
  currentUserId: string
) {
  return (
    role === "admin" ||
    role === "technician" ||
    requesterId === currentUserId
  );
}
