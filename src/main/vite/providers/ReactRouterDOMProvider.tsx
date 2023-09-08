import { RouterProvider } from "react-router-dom";

import { router } from "../routes";

export const ReactRouterDOMProvider = () => {
  return (
    <RouterProvider router={router} />
  );
};
