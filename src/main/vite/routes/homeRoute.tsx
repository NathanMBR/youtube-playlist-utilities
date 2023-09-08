import { RouteObject } from "react-router-dom";

import {
  makeHomePage,
  makeNotFoundPage
} from "../factories";

export const homeRoute: RouteObject = {
  path: "/",
  element: makeHomePage(),
  errorElement: makeNotFoundPage()
};
