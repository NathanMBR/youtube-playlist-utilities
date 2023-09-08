import { AuthCallback } from "@/domain/models";

export namespace GetAuthCallback {
  export type Response = AuthCallback | null;
}

export interface GetAuthCallback {
  execute(): GetAuthCallback.Response;
}
