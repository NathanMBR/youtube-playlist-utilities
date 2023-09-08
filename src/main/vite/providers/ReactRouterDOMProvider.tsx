import { RouterProvider } from "react-router-dom";

import { routes } from "../routes";

export const ReactRouterDOMProvider = () => {
  return (
    <RouterProvider router={routes} />
  );
};
