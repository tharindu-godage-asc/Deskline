// Defines all the routes for the application, including authentication, requester, staff, and common ones

import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { requesterRoutes } from "./requesterRoutes";
import { staffRoutes } from "./staffRoutes";
import { commonRoutes } from "./commonRoutes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...requesterRoutes,
  ...staffRoutes,
  ...commonRoutes,
]);