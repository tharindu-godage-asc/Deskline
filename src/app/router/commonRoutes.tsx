// Routes that are accessible to all authenticated users, regardless of role

import { type RouteObject } from "react-router-dom";
import { RequestDetailPage } from "../../features/requests/pages/RequestDetailPage";
import { Navigate } from "react-router-dom";

export const commonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/my-requests" replace />,
  },

  {
    path: "/requests/:id",
    element: <RequestDetailPage />,
  },
];