import { AuthenticatedButtonRoot } from "./AuthenticatedButtonRoot";

import { AuthenticatedButtonDone } from "./AuthenticatedButtonDone";
import { AuthenticatedButtonLoading } from "./AuthenticatedButtonLoading";
import { AuthenticatedButtonError } from "./AuthenticatedButtonError";

export const AuthenticatedButton = Object.assign(
  AuthenticatedButtonRoot,

  {
    Done: AuthenticatedButtonDone,
    Loading: AuthenticatedButtonLoading,
    Error: AuthenticatedButtonError
  }
);
