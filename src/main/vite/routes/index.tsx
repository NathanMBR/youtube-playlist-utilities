import { createBrowserRouter } from "react-router-dom";

import {
  authRoute,
  authCallbackRoute
} from "./authRoute";
import { homeRoute } from "./homeRoute";
import { getNonPublicVideosRoute } from "./videoRoute";

export const router = createBrowserRouter(
  [
    homeRoute,
    authRoute,
    authCallbackRoute,
    getNonPublicVideosRoute
  ]
);
