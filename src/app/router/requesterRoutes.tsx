import { type RouteObject } from "react-router-dom";
import { RoleRedirect } from "../RoleRedirect";
import { MyRequestsPage } from "../../features/requests/pages/MyRequestsPage";
import { NewRequestPage } from "../../features/requests/pages/NewRequestPage";

export const requesterRoutes: RouteObject[] = [
  {
    path: "/my-requests",
    element: (
      <RoleRedirect allowed={["requester"]}>
        <MyRequestsPage />
      </RoleRedirect>
    ),
  },

  {
    path: "/requests/new",
    element: (
      <RoleRedirect allowed={["requester"]}>
        <NewRequestPage />
      </RoleRedirect>
    ),
  },
];