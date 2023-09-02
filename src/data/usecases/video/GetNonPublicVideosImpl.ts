import { GetNonPublicVideos } from "@/domain/usecases";
import { GetPlaylistVideosRepository } from "@/data/repositories";

export class GetNonPublicVideosImpl implements GetNonPublicVideos {
  constructor(
    private readonly getPlaylistVideosRepository: GetPlaylistVideosRepository
  ) {}

  async execute(request: GetNonPublicVideos.Request): GetNonPublicVideos.Response {
    const { playlistURL } = request;

    const playlistIdParsed = playlistURL.split("list=")[1];
    if (!playlistIdParsed)
      return {
        success: false,
        error: "INVALID_PLAYLIST_URL"
      };

    const playlistId = playlistIdParsed.split("&")[0];
    if (!playlistId)
      return {
        success: false,
        error: "INVALID_PLAYLIST_URL"
      };

    const videos = await this.getPlaylistVideosRepository.get(
      {
        playlistId
      }
    );

    const nonPublicVideos = videos.filter(video => video.status.privacyStatus !== "public");

    return {
      success: true,
      data: nonPublicVideos
    };
  }
}
