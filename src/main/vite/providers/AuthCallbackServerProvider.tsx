import {
  ReactNode,
  useState,
  useEffect
} from "react";
import { invoke } from "@tauri-apps/api";

import { LoadingScreen } from "@/presentation/components";

export type AuthCallbackServerProviderProps = {
  children: ReactNode;
}

export const AuthCallbackServerProvider = (props: AuthCallbackServerProviderProps) => {
  const { children } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      invoke("start_server")
        .finally(() => setIsLoading(false));
    },
    []
  );

  if (isLoading)
    return (
      <LoadingScreen />
    );

  return (
    <>
      {children}
    </>
  );
};
