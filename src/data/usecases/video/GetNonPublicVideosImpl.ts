import { GetNonPublicVideos } from "@/domain/usecases";
import { GetNonPublicVideosValidator } from "@/data/validators";
import { GetPlaylistVideosRepository } from "@/data/repositories";

export class GetNonPublicVideosImpl implements GetNonPublicVideos {
  constructor(
    private readonly getNonPublicVideosValidator: GetNonPublicVideosValidator,
    private readonly getPlaylistVideosRepository: GetPlaylistVideosRepository
  ) {}

  async execute(request: GetNonPublicVideos.Request): GetNonPublicVideos.Response {
    const { authToken } = request;

    const validationResponse = this.getNonPublicVideosValidator.validate(request);

    if (!validationResponse.success)
      return {
        success: false,
        error: "VALIDATION_FAILED"
      };

    const { playlistURL } = validationResponse.data;

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
        playlistId,
        authToken
      }
    );

    if (!videos.success)
      return {
        success: false,
        error: "REPOSITORY_FAILED"
      };

    const nonPublicVideos = videos.data.filter(video => video.status.privacyStatus !== "public");

    return {
      success: true,
      data: nonPublicVideos
    };
  }
}
