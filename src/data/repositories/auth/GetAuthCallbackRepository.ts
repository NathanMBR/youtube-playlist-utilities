import { DataAuthCallback } from "@/data/models";

export namespace GetAuthCallbackRepository {
  export type Response = DataAuthCallback;
}

export interface GetAuthCallbackRepository {
  get(): GetAuthCallbackRepository.Response;
}
