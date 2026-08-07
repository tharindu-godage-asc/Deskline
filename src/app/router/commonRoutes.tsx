// Routes that are accessible to all authenticated users, regardless of role

import { type RouteObject } from "react-router-dom";
import { RequestDetailPage } from "../../features/requests/pages/RequestDetailPage";
import { Navigate } from "react-router-dom";
import { RoleRedirect } from "../RoleRedirect";

export const commonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/my-requests" replace />,
  },

  {
  path: "/requests/:id",
  element: (
    <RoleRedirect
      allowed={[
        "requester",
        "technician",
        "admin",
      ]}
    >
      <RequestDetailPage />
    </RoleRedirect>
  ),
},
];