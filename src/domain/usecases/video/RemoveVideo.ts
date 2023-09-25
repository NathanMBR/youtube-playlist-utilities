import { Video } from "@/domain/models";

export namespace RemoveVideo {
  export type Request = {
    id: Video["id"];
    authToken: string;
  }

  type SuccessResponse = {
    success: true;
  }

  type FailureResponseErrors =
    "INVALID_ID" |
    "UNAUTHORIZED" |
    "NOT_FOUND";

  type FailureResponse = {
    success: false;
    error: FailureResponseErrors;
  }

  export type Response = Promise<SuccessResponse | FailureResponse>;
}

export interface RemoveVideo {
  execute(request: RemoveVideo.Request): RemoveVideo.Response;
}
