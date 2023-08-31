import { Video } from "@/domain/models";

export namespace GetNonPublicVideos {
  export type Request = {
    playlistURL: string;
  };

  export type Response = Array<Video>;
}

export interface GetNonPublicVideos {
  execute(request: GetNonPublicVideos.Request): Promise<GetNonPublicVideos.Response>;
}
