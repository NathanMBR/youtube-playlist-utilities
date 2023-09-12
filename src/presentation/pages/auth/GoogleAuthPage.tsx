import {
  Paper,
  Container
} from "@mantine/core";

import { GetAuthCallback } from "@/domain/usecases";
import { BaseLayout } from "@/presentation/layouts";
import { GoogleAuthButton } from "@/presentation/components";

export type GoogleAuthPageProps = {
  getAuthCallback: GetAuthCallback;
  googleOAuth: {
    baseURL: string;
    clientId: string;
    redirectURLPath: string;
    scopes: string;
  };
};

export const GoogleAuthPage = (props: GoogleAuthPageProps) => {
  const {
    getAuthCallback,
    googleOAuth
  } = props;

  const authCallback = getAuthCallback.execute();

  const clientBaseURL = window.location.origin;

  const redirectURLBuilder = new URL(
    googleOAuth.redirectURLPath,
    clientBaseURL.startsWith("tauri")
      ? clientBaseURL.replace("tauri://", "http://")
      : clientBaseURL
  );

  const redirectURL = redirectURLBuilder.toString();

  const googleAuthenticationURLBuilder = new URL(googleOAuth.baseURL);
  googleAuthenticationURLBuilder.searchParams.append("client_id", googleOAuth.clientId);
  googleAuthenticationURLBuilder.searchParams.append("scope", googleOAuth.scopes);
  googleAuthenticationURLBuilder.searchParams.append("redirect_uri", redirectURL);
  googleAuthenticationURLBuilder.searchParams.append("response_type", "token");
  googleAuthenticationURLBuilder.searchParams.append("prompt", "consent");

  const googleAuthenticationURL = googleAuthenticationURLBuilder.toString();

  return (
    <BaseLayout>
      <Container
        size={420}
        my={40}
      >
        <Paper
          shadow="md"
          radius="md"
          p={30}
          mt={30}
          withBorder
        >
          {
            !authCallback
              ? <GoogleAuthButton href={googleAuthenticationURL} />
              : <div>Authenticated with Google</div>
          }
        </Paper>
      </Container>
    </BaseLayout>
  );
};
