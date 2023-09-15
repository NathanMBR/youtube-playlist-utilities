import { RemoveAuthCallback } from "@/domain/usecases";
import { RemoveAuthCallbackCacheRepository } from "@/data/repositories";

export class RemoveAuthCallbackImpl implements RemoveAuthCallback {
  constructor(
    private readonly removeAuthCallbackCacheRepository: RemoveAuthCallbackCacheRepository
  ) {}

  execute(): RemoveAuthCallback.Response {
    const success = this.removeAuthCallbackCacheRepository.remove();
    return success;
  }
}
