import { GetAuthProfile } from "@/domain/usecases";
import { GetAuthProfileRepository } from "@/data/repositories";

export class GetAuthProfileImpl implements GetAuthProfile {
  constructor(
    private readonly getAuthProfileRepository: GetAuthProfileRepository
  ) {}

  async execute(request: GetAuthProfile.Request): GetAuthProfile.Response {
    const authProfileData = await this.getAuthProfileRepository.get(request);
    if (!authProfileData)
      return null;

    const authProfile: Awaited<NonNullable<GetAuthProfile.Response>> = {
      name: authProfileData.name,
      imageURL: authProfileData.picture
    };

    return authProfile;
  }
}
