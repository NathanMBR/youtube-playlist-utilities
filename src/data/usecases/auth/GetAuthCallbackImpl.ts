import { GetAuthCallback } from "@/domain/usecases";
import { GetAuthCallbackCacheRepository } from "@/data/repositories";

export class GetAuthCallbackImpl implements GetAuthCallback {
  constructor(
    private readonly getAuthCallbackCacheRepository: GetAuthCallbackCacheRepository
  ) {}

  execute(): GetAuthCallback.Response {
    const authCallback = this.getAuthCallbackCacheRepository.get();

    return authCallback;
  }
}
