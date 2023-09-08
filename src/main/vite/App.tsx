
import { RouterProvider } from "react-router-dom";

import { routes } from "./routes";
import { MantineThemeProvider } from "./providers";

export const App = () => {
  return (
    <>
      <MantineThemeProvider>
        <RouterProvider router={routes} />
      </MantineThemeProvider>
    </>
  );
};
