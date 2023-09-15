import {
  GetAuthCallbackImpl,
  GetAuthProfileImpl,
  RemoveAuthCallbackImpl
} from "@/data/usecases";
import {
  NodeAuthCallbackCacheRepository,
  NodeAuthProfileRepository
} from "@/infra/repositories";
import {
  GOOGLE_OAUTH_BASE_URL,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URL_PATH,
  GOOGLE_OAUTH_SCOPES,
  GOOGLE_OAUTH_USER_INFO_URL
} from "@/main/vite/config";
import { GoogleAuthPage } from "@/presentation/pages";

export const makeGoogleAuthPage = () => {
  const authCallbackRepository = new NodeAuthCallbackCacheRepository();
  const getAuthCallback = new GetAuthCallbackImpl(
    authCallbackRepository
  );

  const authProfileRepository = new NodeAuthProfileRepository(GOOGLE_OAUTH_USER_INFO_URL);
  const getAuthProfile = new GetAuthProfileImpl(
    authProfileRepository
  );

  const removeAuthCallback = new RemoveAuthCallbackImpl(
    authCallbackRepository
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
      getAuthProfile={getAuthProfile}
      removeAuthCallback={removeAuthCallback}
      googleOAuth={googleOAuth}
    />
  );
};
