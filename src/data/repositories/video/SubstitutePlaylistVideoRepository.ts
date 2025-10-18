import { DataVideo } from "@/data/models";

export namespace SubstitutePlaylistVideoRepository {
  export type Request = {
    id: DataVideo["id"];
    substituteId: DataVideo["id"];
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

export interface SubstitutePlaylistVideoRepository {
  substitute(request: SubstitutePlaylistVideoRepository.Request): SubstitutePlaylistVideoRepository.Response;
}
