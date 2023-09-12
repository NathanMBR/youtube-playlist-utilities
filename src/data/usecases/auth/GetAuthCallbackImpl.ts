import { GetAuthCallback } from "@/domain/usecases";
import { GetAuthCallbackCacheRepository } from "@/data/repositories";

export class GetAuthCallbackImpl implements GetAuthCallback {
  constructor(
    private readonly getAuthCallbackCacheRepository: GetAuthCallbackCacheRepository
  ) {}

  execute(): GetAuthCallback.Response {
    const authCallback = this.getAuthCallbackCacheRepository.get();

    if (!authCallback)
      return null;

    const isAuthCallbackExpired = authCallback.expiresAt.getTime() <= Date.now();
    if (isAuthCallbackExpired)
      return null;

    return authCallback;
  }
}
