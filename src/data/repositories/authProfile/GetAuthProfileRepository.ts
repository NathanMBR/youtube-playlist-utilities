import { DataAuthProfile } from "@/data/models";

export namespace GetAuthProfileRepository {
  export type Request = {
    token: string;
  };

  export type Response = Promise<DataAuthProfile | null>;
}

export interface GetAuthProfileRepository {
  get(request: GetAuthProfileRepository.Request): GetAuthProfileRepository.Response;
}
