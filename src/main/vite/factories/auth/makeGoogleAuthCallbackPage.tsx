import {
  NodeAuthCallbackRepository,
  NodeAuthCallbackCacheRepository
} from "@/infra/repositories";
import { SetAuthCallbackImpl } from "@/data/usecases";
import { GoogleAuthCallbackPage } from "@/presentation/pages";

export const makeGoogleAuthCallbackPage = () => {
  const getAuthCallbackRepository = new NodeAuthCallbackRepository();
  const setAuthCallbackRepository = new NodeAuthCallbackCacheRepository();

  const setAuthCallback = new SetAuthCallbackImpl(
    getAuthCallbackRepository,
    setAuthCallbackRepository
  );

  return (
    <GoogleAuthCallbackPage setAuthCallback={setAuthCallback} />
  );
};
