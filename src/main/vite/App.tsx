import {
  MantineThemeProvider,
  ReactRouterDOMProvider
} from "./providers";

export const App = () => {
  return (
    <>
      <MantineThemeProvider>
        <ReactRouterDOMProvider />
      </MantineThemeProvider>
    </>
  );
};
