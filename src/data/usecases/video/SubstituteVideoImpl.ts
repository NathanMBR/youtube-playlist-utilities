import { SubstituteVideo } from "@/domain/usecases";
import { SubstitutePlaylistVideoRepository } from "@/data/repositories";

export class SubstituteVideoImpl implements SubstituteVideo {
  constructor(
    private readonly substitutePlaylistVideoRepository: SubstitutePlaylistVideoRepository
  ) {}

  async execute(request: SubstituteVideo.Request): SubstituteVideo.Response {
    const {
      id,
      substituteId,
      authToken
    } = request;

    const substituteVideoResponse = await this.substitutePlaylistVideoRepository.substitute(
      {
        id,
        substituteId,
        authToken
      }
    );

    return substituteVideoResponse;
  }
}
