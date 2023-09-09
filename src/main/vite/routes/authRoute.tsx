import { RouteObject } from "react-router-dom";

import { makeGoogleAuthPage } from "../factories";

export const authRoute: RouteObject = {
  path: "/auth",
  element: makeGoogleAuthPage()
};
