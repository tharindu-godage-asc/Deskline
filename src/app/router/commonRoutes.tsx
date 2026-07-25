// Routes that are accessible to all authenticated users, regardless of role

import { type RouteObject } from "react-router-dom";
import { RequestDetailPage } from "../../features/requests/pages/RequestDetailPage";

export const commonRoutes: RouteObject[] = [
  {
    path: "/requests/:id",
    element: <RequestDetailPage />,
  },
];