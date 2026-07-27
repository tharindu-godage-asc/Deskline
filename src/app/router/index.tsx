// Defines all the routes for the application, including authentication, requester, and common ones

import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { requesterRoutes } from "./requesterRoutes";
import { queueRoutes } from "./queueRoutes";
import { commonRoutes } from "./commonRoutes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...requesterRoutes,
  ...queueRoutes,
  ...commonRoutes,
]);