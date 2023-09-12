import {
  GetAuthCallbackCacheRepository,
  SetAuthCallbackCacheRepository
} from "@/data/repositories";

export class NodeAuthCallbackCacheRepository implements
  GetAuthCallbackCacheRepository,
  SetAuthCallbackCacheRepository
{
  get(): GetAuthCallbackCacheRepository.Response {
    try {
      const authCallbackString = localStorage.getItem("auth-callback");
      if (!authCallbackString)
        return null;

      type AuthCallbackRaw = Omit<NonNullable<GetAuthCallbackCacheRepository.Response>, "expiresAt"> & {
        expiresAt: string;
      };

      const authCallbackRaw = JSON.parse(authCallbackString) as AuthCallbackRaw;

      const authCallback = {
        ...authCallbackRaw,
        expiresAt: new Date(authCallbackRaw.expiresAt)
      };

      return authCallback;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);

      return null;
    }
  }

  set(request: SetAuthCallbackCacheRepository.Request): SetAuthCallbackCacheRepository.Response {
    try {
      const authCallbackString = JSON.stringify(request);

      localStorage.setItem("auth-callback", authCallbackString);

      return true;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);

      return false;
    }
  }
}
