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
  if (!isAuthCallbackSaved)
    return (
      <BaseLayout activeOptionId="auth">
        <Text>ERROR: Authentication callback not saved</Text>
      </BaseLayout>
    );

  window.location.href = "/auth";

  return (
    <BaseLayout activeOptionId="auth">
      <LoadingScreen />
    </BaseLayout>
  );
};
