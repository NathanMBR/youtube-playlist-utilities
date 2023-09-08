import { DataAuthCallback } from "@/data/models";

export namespace SetAuthCallbackCacheRepository {
  export type Request = DataAuthCallback;

  export type Response = void;
}

export interface SetAuthCallbackCacheRepository {
  set(request: SetAuthCallbackCacheRepository.Request): SetAuthCallbackCacheRepository.Response;
}
