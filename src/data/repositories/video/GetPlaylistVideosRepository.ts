import { DataVideo } from "@/data/models";

export namespace GetPlaylistVideosRepository {
  export type Request = {
    playlistId: string;
  };

  type SuccessResponse = {
    success: true;
    data: Array<DataVideo>;
  };

  type FailureResponseErrors =
    "INVALID_PLAYLIST" |
    "FORBIDDEN_PLAYLIST" |
    "PLAYLIST_NOT_FOUND" |
    "INVALID_FETCH_URL" |
    "NON_JSON_RESPONSE_BODY" |
    "UNKNOWN_ERROR";

  type FailureResponse = {
    success: false;
    error: FailureResponseErrors;
  };

  export type Response = Promise<SuccessResponse | FailureResponse>;
}

export interface GetPlaylistVideosRepository {
  get(request: GetPlaylistVideosRepository.Request): GetPlaylistVideosRepository.Response;
}
