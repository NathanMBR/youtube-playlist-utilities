import { GetAuthCallback } from "@/domain/usecases";
import { GetAuthCallbackRepository } from "@/data/repositories";

export class GetAuthCallbackImpl implements GetAuthCallback {
  constructor(
    private readonly getAuthCallbackRepository: GetAuthCallbackRepository
  ) {}

  execute(): GetAuthCallback.Response {
    const authCallback = this.getAuthCallbackRepository.get();

    return authCallback;
  }
}
