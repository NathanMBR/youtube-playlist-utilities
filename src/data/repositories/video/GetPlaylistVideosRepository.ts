import { DataVideo } from "@/data/models";

export namespace GetPlaylistVideosRepository {
  export type Request = {
    playlistId: string;
  };

  export type Response = Promise<Array<DataVideo>>;
}

export interface GetPlaylistVideosRepository {
  get(request: GetPlaylistVideosRepository.Request): GetPlaylistVideosRepository.Response;
}
