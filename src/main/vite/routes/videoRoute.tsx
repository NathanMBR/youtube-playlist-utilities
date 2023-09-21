import { RouteObject } from "react-router-dom";

import { makeGetNonPublicVideosPage } from "../factories";

export const getNonPublicVideosRoute: RouteObject = {
  path: "/playlist/unavailable",
  element: makeGetNonPublicVideosPage()
};
