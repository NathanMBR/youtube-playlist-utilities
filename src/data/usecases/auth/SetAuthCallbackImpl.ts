import { SetAuthCallback } from "@/domain/usecases";
import {
  GetAuthCallbackRepository,
  SetAuthCallbackCacheRepository
} from "@/data/repositories";

export class SetAuthCallbackImpl implements SetAuthCallback {
  constructor(
    private readonly getAuthCallbackRepository: GetAuthCallbackRepository,
    private readonly setAuthCallbackCacheRepository: SetAuthCallbackCacheRepository
  ) {}

  execute(): SetAuthCallback.Response {
    const authCallback = this.getAuthCallbackRepository.get();
    if (!authCallback)
      return false;

    const success = this.setAuthCallbackCacheRepository.set(authCallback);
    return success;
  }
}
