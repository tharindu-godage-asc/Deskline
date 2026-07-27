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
  role: UserRole
) {
  return role === "admin";
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

