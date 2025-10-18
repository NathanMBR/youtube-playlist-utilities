import { Video } from "@/domain/models";

export namespace SubstituteVideo {
  export type Request = {
    id: Video["id"];
    substituteId: Video["id"];
    authToken: string;
  }

  type SuccessResponse = {
    success: true;
  }

  type FailureResponseErrors =
    "INVALID_ID" |
    "INVALID_SUBSTITUTE_ID" |
    "NOT_FOUND" |
    "SUBSTITUTE_NOT_FOUND" |
    "UNAUTHORIZED";

  type FailureResponse = {
    success: false;
    error: FailureResponseErrors;
  }

  export type Response = Promise<SuccessResponse | FailureResponse>;
}

export interface SubstituteVideo {
  execute(request: SubstituteVideo.Request): SubstituteVideo.Response;
}
