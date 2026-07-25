import { type RouteObject } from "react-router-dom";
import { RoleRedirect } from "../RoleRedirect";

import { QueuePage } from "../../features/requests/pages/QueuePage";

export const staffRoutes: RouteObject[] = [
  {
    path: "/queue",
    element: (
      <RoleRedirect allowed={["staff"] as unknown as any}>
        <QueuePage />
      </RoleRedirect>
    ),
  },
];