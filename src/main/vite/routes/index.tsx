import { createBrowserRouter } from "react-router-dom";

import {
  authRoute,
  authCallbackRoute
} from "./authRoute";
import { homeRoute } from "./homeRoute";

export const router = createBrowserRouter(
  [
    homeRoute,
    authRoute,
    authCallbackRoute
  ]
);
