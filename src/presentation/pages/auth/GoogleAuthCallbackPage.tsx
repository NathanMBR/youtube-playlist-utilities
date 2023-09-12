import {
  Center,
  Loader
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { SetAuthCallback } from "@/domain/usecases";
import { BaseLayout } from "@/presentation/layouts";

export type GoogleAuthCallbackPageProps = {
  setAuthCallback: SetAuthCallback;
};

export const GoogleAuthCallbackPage = (props: GoogleAuthCallbackPageProps) => {
  const { setAuthCallback } = props;

  const { height } = useViewportSize();

  const isAuthCallbackSaved = setAuthCallback.execute();

  if (isAuthCallbackSaved)
    window.location.href = "/auth";

  return (
    <BaseLayout>
      {
        isAuthCallbackSaved
          ? <Center h={height * 0.9}>
            <Loader />
          </Center>
          : <p>ERROR: Authentication callback not saved</p>
      }
    </BaseLayout>
  );
};
