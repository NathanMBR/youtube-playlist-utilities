import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

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
          <h1>YouTube Playlist Utilities</h1>
          <p>Under construction...</p>
          <button onClick={() => toggleColorScheme()}>Toggle theme</button>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};
