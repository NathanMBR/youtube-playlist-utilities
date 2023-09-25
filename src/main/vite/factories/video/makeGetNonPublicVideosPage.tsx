import {
  NodeAuthCallbackCacheRepository,
  NodeVideosRepository
} from "@/infra/repositories";
import {
  GetAuthCallbackImpl,
  GetNonPublicVideosImpl,
  RemoveVideoImpl
} from "@/data/usecases";
import { YOUTUBE_BASE_PLAYLIST_ITEMS_URL } from "@/main/vite/config";
import { ZodGetNonPublicVideosValidator } from "@/infra/validators";
import { GetNonPublicVideosPage } from "@/presentation/pages";

export const makeGetNonPublicVideosPage = () => {
  const getNonPublicVideosValidator = new ZodGetNonPublicVideosValidator();

  const authCallbackCacheRepository = new NodeAuthCallbackCacheRepository();
  const playlistVideosRepository = new NodeVideosRepository(YOUTUBE_BASE_PLAYLIST_ITEMS_URL);

  const getAuthCallback = new GetAuthCallbackImpl(
    authCallbackCacheRepository
  );

  const getNonPublicVideos = new GetNonPublicVideosImpl(
    getNonPublicVideosValidator,
    playlistVideosRepository
  );

  const removeVideo = new RemoveVideoImpl(
    playlistVideosRepository
  );

  return (
    <GetNonPublicVideosPage
      getAuthCallback={getAuthCallback}
      getNonPublicVideos={getNonPublicVideos}
      removeVideo={removeVideo}
    />
  );
};
