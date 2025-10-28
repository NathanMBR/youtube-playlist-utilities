import {
  NodeAuthCallbackCacheRepository,
  NodeVideosRepository
} from "@/infra/repositories";
import {
  GetAuthCallbackImpl,
  GetNonPublicVideosImpl,
  RemoveVideoImpl,
  SubstituteVideoImpl
} from "@/data/usecases";
import {
  YOUTUBE_BASE_PLAYLIST_ITEMS_URL,
  YOUTUBE_BASE_VIDEOS_URL
} from "@/main/vite/config";
import { ZodGetNonPublicVideosValidator } from "@/infra/validators";
import { GetNonPublicVideosPage } from "@/presentation/pages";

export const makeGetNonPublicVideosPage = () => {
  const getNonPublicVideosValidator = new ZodGetNonPublicVideosValidator();

  const authCallbackCacheRepository = new NodeAuthCallbackCacheRepository();
  const playlistVideosRepository = new NodeVideosRepository(
    YOUTUBE_BASE_PLAYLIST_ITEMS_URL,
    YOUTUBE_BASE_VIDEOS_URL
  );

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

  const substituteVideo = new SubstituteVideoImpl(
    playlistVideosRepository
  );

  return (
    <GetNonPublicVideosPage
      getAuthCallback={getAuthCallback}
      getNonPublicVideos={getNonPublicVideos}
      removeVideo={removeVideo}
      substituteVideo={substituteVideo}
    />
  );
};
