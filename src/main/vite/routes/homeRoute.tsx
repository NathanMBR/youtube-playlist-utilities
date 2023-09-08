import { RouteObject } from "react-router-dom";

import { makeHomePage } from "../factories";

export const homeRoute: RouteObject = {
  path: "/",
  element: makeHomePage()
};
