import {
  DataPagination,
  DataVideo
} from "@/data/models";

export namespace GetPlaylistVideosRepository {
  export type Request = {
    playlistId: string;
    pageToken?: string;
  };

  type PaginatedVideos = DataPagination<DataVideo>;
  export type Response = Promise<PaginatedVideos>;
}

export interface GetPlaylistVideosRepository {
  get(request: GetPlaylistVideosRepository.Request): GetPlaylistVideosRepository.Response;
}
