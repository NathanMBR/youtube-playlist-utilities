import {
  Paper,
  Container
} from "@mantine/core";

import { } from "@/domain/usecases";
import { BaseLayout } from "@/presentation/layouts";
import { GoogleAuthButton } from "@/presentation/components";

export type GoogleAuthPageProps = {
  googleOAuth: {
    baseURL: string;
    clientId: string;
    redirectURL: string;
    scopes: string;
  };
};

export const GoogleAuthPage = (props: GoogleAuthPageProps) => {
  const { googleOAuth } = props;

  const googleAuthenticationURLBuilder = new URL(googleOAuth.baseURL);
  googleAuthenticationURLBuilder.searchParams.append("client_id", googleOAuth.clientId);
  googleAuthenticationURLBuilder.searchParams.append("redirect_uri", googleOAuth.redirectURL);
  googleAuthenticationURLBuilder.searchParams.append("scope", googleOAuth.scopes);
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
          p={30}
          mt={30}
          radius="md"
          withBorder
        >
          <GoogleAuthButton href={googleAuthenticationURL}>Authenticate with Google</GoogleAuthButton>
        </Paper>
      </Container>
    </BaseLayout>
  );
};
