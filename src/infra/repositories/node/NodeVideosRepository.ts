import {
  DataVideo,
  DataPagination
} from "@/data/models";
import { GetPlaylistVideosRepository } from "@/data/repositories";

export class NodeVideosRepository implements GetPlaylistVideosRepository {
  constructor(
    private readonly youtubePlaylistVideosBaseURL: string,
    private readonly youtubeApiKey: string
  ) {}

  async get(request: GetPlaylistVideosRepository.Request): GetPlaylistVideosRepository.Response {
    try {
      const { playlistId } = request;

      const maxResults = "50";
      const playlistItemsURLParts = [
        "id",
        "snippet",
        "status"
      ].join(",");

      const playlistItemsURL = new URL(this.youtubePlaylistVideosBaseURL);
      playlistItemsURL.searchParams.set("key", this.youtubeApiKey);
      playlistItemsURL.searchParams.set("playlistId", playlistId);
      playlistItemsURL.searchParams.set("part", playlistItemsURLParts);
      playlistItemsURL.searchParams.set("maxResults", maxResults);

      const videos: Array<DataVideo> = [];
      let pageToken: string | undefined;

      do {
        if (!!pageToken)
          playlistItemsURL.searchParams.set("pageToken", pageToken);
        else
          playlistItemsURL.searchParams.delete("pageToken");

        /* eslint-disable no-await-in-loop */
        const playlistItemsResponse = await fetch(playlistItemsURL.toString());

        if (!playlistItemsResponse.ok) {
          if (playlistItemsResponse.status === 400)
            return {
              success: false,
              error: "INVALID_PLAYLIST"
            };

          if (playlistItemsResponse.status === 403)
            return {
              success: false,
              error: "FORBIDDEN_PLAYLIST"
            };

          if (playlistItemsResponse.status === 404)
            return {
              success: false,
              error: "PLAYLIST_NOT_FOUND"
            };

          return {
            success: false,
            error: "UNKNOWN"
          };
        }

        const playlistItems = await playlistItemsResponse.json() as DataPagination<DataVideo>;
        /* eslint-enable no-await-in-loop */

        videos.push(...playlistItems.items);
        pageToken = playlistItems.nextPageToken;
      } while (!!pageToken);

      return {
        success: true,
        data: videos
      };
    } catch (error) {
      if (error instanceof TypeError)
        return {
          success: false,
          error: "INVALID_PLAYLIST_URL"
        };

      if (error instanceof SyntaxError)
        return {
          success: false,
          error: "NON_JSON_RESPONSE_BODY"
        };

      throw error;
    }
  }
}
