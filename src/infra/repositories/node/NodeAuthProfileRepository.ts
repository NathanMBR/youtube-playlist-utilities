import { GetAuthProfileRepository } from "@/data/repositories";
import { DataAuthProfile } from "@/data/models";

export class NodeAuthProfileRepository implements GetAuthProfileRepository {
  constructor(
    private readonly googleUserInfoURL: string
  ) {}

  async get(request: GetAuthProfileRepository.Request): GetAuthProfileRepository.Response {
    try {
      const { token } = request;

      const authProfileResponse = await fetch(
        this.googleUserInfoURL,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!authProfileResponse.ok)
        return null;

      const dataAuthProfile = await authProfileResponse.json() as DataAuthProfile;
      return dataAuthProfile;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);

      return null;
    }
  }
}
