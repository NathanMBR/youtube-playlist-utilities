import { GetAuthCallbackRepository } from "@/data/repositories";

export class NodeAuthCallbackRepository implements GetAuthCallbackRepository {
  get(): GetAuthCallbackRepository.Response {
    const queryParamsString = window.location.hash.slice(1);
    const queryParams = new URLSearchParams(queryParamsString);

    const accessToken = queryParams.get("access_token");
    if (!accessToken)
      return null;

    const tokenType = queryParams.get("token_type");
    if (!tokenType || tokenType !== "Bearer")
      return null;

    const expiresIn = Number(queryParams.get("expires_in"));
    if (!expiresIn || expiresIn <= 0)
      return null;

    const scope = queryParams.get("scope");
    if (!scope)
      return null;

    const oneSecondToMilliseconds = 1000;
    const expiresAt = new Date(Date.now() + expiresIn * oneSecondToMilliseconds);

    const authCallback: GetAuthCallbackRepository.Response = {
      accessToken,
      tokenType,
      expiresAt,
      scope
    };

    return authCallback;
  }
}
