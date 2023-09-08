import { GetAuthCallbackCacheRepository } from "@/data/repositories";

export class NodeAuthCallbackCacheRepository implements GetAuthCallbackCacheRepository {
  get(): GetAuthCallbackCacheRepository.Response {
    try {
      const authCallbackString = localStorage.getItem("auth-callback");
      if (!authCallbackString)
        return null;

      const authCallback = JSON.parse(authCallbackString) as GetAuthCallbackCacheRepository.Response;
      return authCallback;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);

      return null;
    }
  }
}
