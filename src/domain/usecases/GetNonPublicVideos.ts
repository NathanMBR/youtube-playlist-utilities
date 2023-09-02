import { Video } from "@/domain/models";

export namespace GetNonPublicVideos {
  export type Request = {
    playlistURL: string;
  };

  type NonPublicVideos = Array<Video>;

  type SuccessResponse = {
    success: true;
    data: NonPublicVideos;
  }

  type FailureResponseErrors = "INVALID_PLAYLIST_URL";

  type FailureResponse = {
    success: false;
    error: FailureResponseErrors;
  };

  export type Response = Promise<SuccessResponse | FailureResponse>;
}

export interface GetNonPublicVideos {
  execute(request: GetNonPublicVideos.Request): GetNonPublicVideos.Response;
}
