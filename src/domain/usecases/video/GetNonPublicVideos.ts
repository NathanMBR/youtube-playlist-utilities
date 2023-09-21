import { Video } from "@/domain/models";

export namespace GetNonPublicVideos {
  export type Request = {
    playlistURL: string;
    authToken: string;
  };

  type NonPublicVideos = Array<Video>;

  type SuccessResponse = {
    success: true;
    data: NonPublicVideos;
  }

  type FailureResponseErrors =
    "VALIDATION_FAILED" |
    "INVALID_PLAYLIST_URL" |
    "REPOSITORY_FAILED";

  type FailureResponse = {
    success: false;
    error: FailureResponseErrors;
  };

  export type Response = Promise<SuccessResponse | FailureResponse>;
}

export interface GetNonPublicVideos {
  execute(request: GetNonPublicVideos.Request): GetNonPublicVideos.Response;
}
