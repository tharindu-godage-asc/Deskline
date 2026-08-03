import { type RouteObject } from "react-router-dom";

import { RoleRedirect } from "../RoleRedirect";
import { QueuePage } from "../../features/requests/pages/QueuePage";

export const queueRoutes: RouteObject[] = [
  {
    path: "/queue",
    element: (
      <RoleRedirect
        allowed={[
          "technician",
          "admin",
        ]}
      >
        <QueuePage />
      </RoleRedirect>
    ),
  },
];