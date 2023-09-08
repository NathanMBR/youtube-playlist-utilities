import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ReactNode } from "react";

export type MantineThemeProviderProps = {
  children: ReactNode;
};

export const MantineThemeProvider = (props: MantineThemeProviderProps) => {
  const { children } = props;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>(
    {
      key: "theme",
      defaultValue: "light",
      getInitialValueInEffect: true
    }
  );

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {
          children
        }
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
