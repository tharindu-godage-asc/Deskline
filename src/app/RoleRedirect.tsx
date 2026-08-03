import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../shared/api/auth";
import type { UserRole } from "../shared/types/user";

type Props = {
  allowed: UserRole[];
  children: React.ReactNode;
};

export function RoleRedirect({
  allowed,
  children,
}: Props) {
  const currentUser = getCurrentUser();

    if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  if (!allowed.includes(currentUser.role as UserRole)) {
    const redirectPath =
      currentUser.role === "requester"
        ? "/my-requests"
        : "/queue";

    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return <>{children}</>;
}

