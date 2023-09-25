import { RemoveVideo } from "@/domain/usecases";
import { RemovePlaylistVideoRepository } from "@/data/repositories";

export class RemoveVideoImpl implements RemoveVideo {
  constructor(
    private readonly removePlaylistVideoRepository: RemovePlaylistVideoRepository
  ) {}

  async execute(request: RemoveVideo.Request): RemoveVideo.Response {
    const {
      id,
      authToken
    } = request;

    const removeVideoResponse = await this.removePlaylistVideoRepository.remove(
      {
        id,
        authToken
      }
    );

    return removeVideoResponse;
  }
}
