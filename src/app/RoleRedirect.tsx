// The purpose is to prevent users with the wrong role 
// from accessing certain routes and automatically redirect them to the correct page.

import { Navigate } from "react-router-dom";
import { currentUser } from "../shared/api/auth";
import type { UserRole } from "../shared/types/user";

type Props = {
  allowed: UserRole[];
  children: React.ReactNode;
};

export function RoleRedirect({
  allowed,
  children,
}: Props) {
   if (!allowed.includes(currentUser.role as UserRole)) {
    const redirectPath =
      currentUser.role === "staff"
        ? "/queue"
        : "/my-requests";

    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}