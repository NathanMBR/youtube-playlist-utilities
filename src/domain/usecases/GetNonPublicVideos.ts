import { Video } from "@/domain/models";

export namespace GetNonPublicVideos {
  export type Request = {
    playlistURL: string;
  };

  type NonPublicVideos = Array<Video>;
  export type Response = Promise<NonPublicVideos>;
}

export interface GetNonPublicVideos {
  execute(request: GetNonPublicVideos.Request): GetNonPublicVideos.Response;
}
