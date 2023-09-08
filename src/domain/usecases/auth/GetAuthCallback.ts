import { AuthCallback } from "@/domain/models";

export namespace GetAuthCallback {
  export type Response = AuthCallback;
}

export interface GetAuthCallback {
  execute(): GetAuthCallback.Response;
}
