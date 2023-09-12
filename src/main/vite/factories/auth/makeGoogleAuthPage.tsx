import { GoogleAuthPage } from "@/presentation/pages";
import { GetAuthCallbackImpl } from "@/data/usecases";
import { NodeAuthCallbackCacheRepository } from "@/infra/repositories";
import {
  GOOGLE_OAUTH_BASE_URL,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URL_PATH,
  GOOGLE_OAUTH_SCOPES
} from "@/main/vite/config";

export const makeGoogleAuthPage = () => {
  const getAuthCallbackRepository = new NodeAuthCallbackCacheRepository();
  const getAuthCallback = new GetAuthCallbackImpl(
    getAuthCallbackRepository
  );

  const googleOAuth = {
    baseURL: GOOGLE_OAUTH_BASE_URL,
    clientId: GOOGLE_OAUTH_CLIENT_ID,
    redirectURLPath: GOOGLE_OAUTH_REDIRECT_URL_PATH,
    scopes: GOOGLE_OAUTH_SCOPES
  };

  return (
    <GoogleAuthPage
      getAuthCallback={getAuthCallback}
      googleOAuth={googleOAuth}
    />
  );
};
