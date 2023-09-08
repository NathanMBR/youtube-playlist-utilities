import { DataAuthCallback } from "@/data/models";

export namespace GetAuthCallbackCacheRepository {
  export type Response = DataAuthCallback | null;
}

export interface GetAuthCallbackCacheRepository {
  get(): GetAuthCallbackCacheRepository.Response;
}
