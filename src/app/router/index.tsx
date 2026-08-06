// Defines all the routes for the application, including authentication, requester, and common ones

import { createBrowserRouter, type RouteObject } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { requesterRoutes } from "./requesterRoutes";
import { queueRoutes } from "./queueRoutes";
import { commonRoutes } from "./commonRoutes";
import { AppErrorPage } from "../../shared/errors/AppErrorPage";

const appRoutes: RouteObject[] = [
  ...authRoutes,
  ...requesterRoutes,
  ...queueRoutes,
  ...commonRoutes,
];

export const router = createBrowserRouter([
  {
    errorElement: <AppErrorPage />,
    children: appRoutes,
  },
]);