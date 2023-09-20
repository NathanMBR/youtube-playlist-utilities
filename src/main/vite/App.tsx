import {
  MantineThemeProvider,
  AuthCallbackServerProvider,
  ReactRouterDOMProvider
} from "./providers";

export const App = () => {
  return (
    <>
      <MantineThemeProvider>
        <AuthCallbackServerProvider>
          <ReactRouterDOMProvider />
        </AuthCallbackServerProvider>
      </MantineThemeProvider>
    </>
  );
};
