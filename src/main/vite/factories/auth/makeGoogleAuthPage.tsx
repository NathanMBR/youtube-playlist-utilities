import { GoogleAuthPage } from "@/presentation/pages";
import {
  GOOGLE_OAUTH_BASE_URL,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URL_PATH,
  GOOGLE_OAUTH_SCOPES
} from "@/main/vite/config";

export const makeGoogleAuthPage = () => {
  const redirectURLBuilder = new URL(
    GOOGLE_OAUTH_REDIRECT_URL_PATH,
    window.location.origin
  );

  const redirectURL = redirectURLBuilder.toString();

  const googleOAuth = {
    baseURL: GOOGLE_OAUTH_BASE_URL,
    clientId: GOOGLE_OAUTH_CLIENT_ID,
    redirectURL: redirectURL,
    scopes: GOOGLE_OAUTH_SCOPES
  };

  return (
    <GoogleAuthPage googleOAuth={googleOAuth} />
  );
};
