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