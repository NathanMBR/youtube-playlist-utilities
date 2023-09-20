import {
  Paper,
  Container
} from "@mantine/core";
import {
  useState,
  useEffect
} from "react";
import { event } from "@tauri-apps/api";

import {
  GoogleAuthButton,
  AuthenticatedButton
} from "@/presentation/components";
import {
  GetAuthCallback,
  GetAuthProfile,
  RemoveAuthCallback
} from "@/domain/usecases";
import { BaseLayout } from "@/presentation/layouts";

export type GoogleAuthPageProps = {
  getAuthCallback: GetAuthCallback;
  getAuthProfile: GetAuthProfile;
  removeAuthCallback: RemoveAuthCallback;
  googleOAuth: {
    baseURL: string;
    clientId: string;
    redirectURL: string;
    scopes: string;
  };
};

export const GoogleAuthPage = (props: GoogleAuthPageProps) => {
  const {
    getAuthCallback,
    getAuthProfile,
    removeAuthCallback,
    googleOAuth
  } = props;

  type GetAuthProfileResponse = Awaited<ReturnType<GetAuthProfile["execute"]>>;

  const [isLoadingAuthProfile, setIsLoadingAuthProfile] = useState(false);
  const [authProfile, setAuthProfile] = useState<GetAuthProfileResponse>(null);

  const authCallback = getAuthCallback.execute();

  const googleAuthenticationURLBuilder = new URL(googleOAuth.baseURL);
  googleAuthenticationURLBuilder.searchParams.append("client_id", googleOAuth.clientId);
  googleAuthenticationURLBuilder.searchParams.append("scope", googleOAuth.scopes);
  googleAuthenticationURLBuilder.searchParams.append("redirect_uri", googleOAuth.redirectURL);
  googleAuthenticationURLBuilder.searchParams.append("response_type", "token");
  googleAuthenticationURLBuilder.searchParams.append("prompt", "consent");

  const googleAuthenticationURL = googleAuthenticationURLBuilder.toString();

  const handleLogout = () => {
    removeAuthCallback.execute();
    window.location.reload();
  };

  useEffect(
    () => {
      const unlistenAuthCallback = event.listen(
        "google-auth-callback",
        (callbackData: event.Event<string>) => {
          const urlHash = new URL(callbackData.payload).hash;
          window.location.href = "/auth/callback" + urlHash;
        }
      );

      if (authCallback) {
        setIsLoadingAuthProfile(true);

        const getAuthProfileRequest = {
          token: authCallback.accessToken
        };

        const handleGetAuthProfile = async (authProfile: GetAuthProfileResponse) => {
          setAuthProfile(authProfile);
          setIsLoadingAuthProfile(false);
        };

        getAuthProfile
          .execute(getAuthProfileRequest)
          .then(handleGetAuthProfile);
      }

      return () => {
        unlistenAuthCallback.then(unlistenFn => unlistenFn());
      };
    },
    []
  );

  const paperPadding = !authCallback
    ? 30
    : 0;

  type AuthPageButtonProps = {
    hasAuthCallback: boolean;
    isLoadingAuthProfile: boolean;
    hasAuthProfile: boolean;
  }

  const AuthPageButton = (props: AuthPageButtonProps) => {
    const {
      hasAuthCallback,
      isLoadingAuthProfile,
      hasAuthProfile
    } = props;

    if (!hasAuthCallback)
      return (
        <>
          <GoogleAuthButton href={googleAuthenticationURL} />
        </>
      );

    if (isLoadingAuthProfile)
      return (
        <AuthenticatedButton>
          <AuthenticatedButton.Loading />
        </AuthenticatedButton>
      );

    if (!hasAuthProfile)
      return (
        <AuthenticatedButton handleLogout={handleLogout}>
          <AuthenticatedButton.Error />
        </AuthenticatedButton>
      );

    return (
      <AuthenticatedButton handleLogout={handleLogout}>
        <AuthenticatedButton.Done
          name={authProfile!.name}
          imageURL={authProfile!.imageURL}
        />
      </AuthenticatedButton>
    );
  };

  return (
    <BaseLayout activeOptionId="auth">
      <Container
        size={420}
        my={40}
      >
        <Paper
          shadow="md"
          radius="md"
          mt={30}
          p={paperPadding}
          withBorder
        >
          <AuthPageButton
            hasAuthCallback={!!authCallback}
            isLoadingAuthProfile={isLoadingAuthProfile}
            hasAuthProfile={!!authProfile}
          />
        </Paper>
      </Container>
    </BaseLayout>
  );
};
