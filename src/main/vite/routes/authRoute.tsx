import { RouteObject } from "react-router-dom";

import {
  makeGoogleAuthPage,
  makeGoogleAuthCallbackPage
} from "../factories";

export const authRoute: RouteObject = {
  path: "/auth",
  element: makeGoogleAuthPage()
};

export const authCallbackRoute: RouteObject = {
  path: "/auth/callback",
  element: makeGoogleAuthCallbackPage()
};
