import { Text } from "@mantine/core";

import { SetAuthCallback } from "@/domain/usecases";
import { BaseLayout } from "@/presentation/layouts";
import { LoadingScreen } from "@/presentation/components";

export type GoogleAuthCallbackPageProps = {
  setAuthCallback: SetAuthCallback;
};

export const GoogleAuthCallbackPage = (props: GoogleAuthCallbackPageProps) => {
  const { setAuthCallback } = props;

  const isAuthCallbackSaved = setAuthCallback.execute();

  if (isAuthCallbackSaved)
    window.location.href = "/auth";

  return (
    <BaseLayout activeOptionId="auth">
      {
        isAuthCallbackSaved
          ? <LoadingScreen />
          : <Text>ERROR: Authentication callback not saved</Text>
      }
    </BaseLayout>
  );
};
