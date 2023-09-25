import {
  DataVideo,
  DataPagination
} from "@/data/models";
import {
  GetPlaylistVideosRepository,
  RemovePlaylistVideoRepository
} from "@/data/repositories";

export class NodeVideosRepository implements
  GetPlaylistVideosRepository,
  RemovePlaylistVideoRepository
{
  constructor(
    private readonly youtubePlaylistVideosBaseURL: string
  ) {}

  async get(request: GetPlaylistVideosRepository.Request): GetPlaylistVideosRepository.Response {
    try {
      const {
        playlistId,
        authToken
      } = request;

      const maxResults = "50";
      const playlistItemsURLParts = [
        "id",
        "snippet",
        "status"
      ].join(",");

      const playlistItemsURLBuilder = new URL(this.youtubePlaylistVideosBaseURL);
      playlistItemsURLBuilder.searchParams.set("playlistId", playlistId);
      playlistItemsURLBuilder.searchParams.set("part", playlistItemsURLParts);
      playlistItemsURLBuilder.searchParams.set("maxResults", maxResults);

      const videos: Array<DataVideo> = [];
      let pageToken: string | undefined;

      do {
        if (!!pageToken)
          playlistItemsURLBuilder.searchParams.set("pageToken", pageToken);
        else
          playlistItemsURLBuilder.searchParams.delete("pageToken");

        const playlistItemsURL = playlistItemsURLBuilder.toString();

        /* eslint-disable no-await-in-loop */
        const playlistItemsResponse = await fetch(
          playlistItemsURL,

          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

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

  async remove(request: RemovePlaylistVideoRepository.Request): RemovePlaylistVideoRepository.Response {
    const {
      id,
      authToken
    } = request;

    const playlistItemsURLBuilder = new URL(this.youtubePlaylistVideosBaseURL);
    playlistItemsURLBuilder.searchParams.set("id", id);

    const playlistItemsURL = playlistItemsURLBuilder.toString();

    const removePlaylistItemResponse = await fetch(
      playlistItemsURL,

      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );

    if (removePlaylistItemResponse.status === 400)
      return {
        success: false,
        error: "INVALID_ID"
      };

    if (removePlaylistItemResponse.status === 403)
      return {
        success: false,
        error: "UNAUTHORIZED"
      };

    if (removePlaylistItemResponse.status === 404)
      return {
        success: false,
        error: "NOT_FOUND"
      };

    return {
      success: true
    };
  }
}
