import { DataVideo } from "@/data/models";

export namespace RemovePlaylistVideoRepository {
  export type Request = {
    id: DataVideo["id"];
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

export interface RemovePlaylistVideoRepository {
  remove(request: RemovePlaylistVideoRepository.Request): RemovePlaylistVideoRepository.Response;
}
