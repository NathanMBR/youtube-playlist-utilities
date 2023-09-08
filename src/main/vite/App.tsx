import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { RouterProvider } from "react-router-dom";

import { routes } from "./routes";

export const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>(
    {
      key: "theme",
      defaultValue: "light",
      getInitialValueInEffect: true
    }
  );

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RouterProvider router={routes} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};
