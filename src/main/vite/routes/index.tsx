import { createBrowserRouter } from "react-router-dom";

import { homeRoute } from "./homeRoute";
import { authRoute } from "./authRoute";

export const router = createBrowserRouter(
  [
    homeRoute,
    authRoute
  ]
);
