import { AuthProfile } from "@/domain/models";

export namespace GetAuthProfile {
  export type Request = {
    token: string;
  };

  export type Response = Promise<AuthProfile | null>;
}

export interface GetAuthProfile {
  execute(request: GetAuthProfile.Request): GetAuthProfile.Response;
}
