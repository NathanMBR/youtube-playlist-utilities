import { createBrowserRouter } from "react-router-dom";

import { makeHomePage } from "../factories";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: makeHomePage()
    }
  ]
);
