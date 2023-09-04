import {
  DataValidation
} from "@/data/models";

export namespace GetNonPublicVideosValidator {
  export type Request = {
    playlistURL: string;
  };

  export type Response = DataValidation<Request>;
}

export interface GetNonPublicVideosValidator {
  validate(request: GetNonPublicVideosValidator.Request): GetNonPublicVideosValidator.Response;
}
