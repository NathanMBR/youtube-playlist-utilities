import {
  useState,
  useEffect
} from "react";
import { Title } from "@mantine/core";

import {
  GetAuthCallback,
  GetNonPublicVideos,
  RemoveVideo
} from "@/domain/usecases";
import {
  BaseLayout,
  AuthenticationRequiredLayout
} from "@/presentation/layouts";
import {
  NonPublicVideosForm,
  VideosTable,
  LoadingScreen
} from "@/presentation/components";
import { Video } from "@/domain/models";

export type GetNonPublicVideosPageProps = {
  getAuthCallback: GetAuthCallback;
  getNonPublicVideos: GetNonPublicVideos;
  removeVideo: RemoveVideo;
}

export const GetNonPublicVideosPage = (props: GetNonPublicVideosPageProps) => {
  const {
    getAuthCallback,
    getNonPublicVideos,
    removeVideo
  } = props;

  const authCallback = getAuthCallback.execute();

  const [videos, setVideos] = useState<Array<Video> | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleSearch = async (url: string) => {
    setUrl(url);
  };

  const executeGetNonPublicVideos = async () => {
    setIsLoading(true);
    setError("");
    setVideos(null);

    const nonPublicVideosResponse = await getNonPublicVideos.execute(
      {
        playlistURL: url,
        authToken: authCallback!.accessToken
      }
    );

    if (!nonPublicVideosResponse.success) {
      type PossibleErrors = typeof nonPublicVideosResponse.error;

      const errorMessages: Record<PossibleErrors, string> = {
        INVALID_PLAYLIST_URL: "Invalid playlist URL",
        VALIDATION_FAILED: "Invalid playlist URL",
        REPOSITORY_FAILED: "The playlist doesn't exist, isn't public or isn't valid"
      };

      setError(errorMessages[nonPublicVideosResponse.error]);
      setIsLoading(false);
      return;
    }

    setVideos(nonPublicVideosResponse.data);

    setIsLoading(false);
  };

  const getRemoveVideoHandler = (videoId: string) => {
    return async () => {
      setIsLoading(true);

      const removeVideoResponse = await removeVideo.execute(
        {
          id: videoId,
          authToken: authCallback!.accessToken
        }
      );

      if (!removeVideoResponse.success) {
        type PossibleErrors = typeof removeVideoResponse.error;

        const errorMessages: Record<PossibleErrors, string> = {
          INVALID_ID: "Invalid video ID",
          UNAUTHORIZED: "You can't remove a video from a playlist that isn't yours",
          NOT_FOUND: "Video not found in the current playlist"
        };

        const errorMessage = errorMessages[removeVideoResponse.error];

        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      await executeGetNonPublicVideos();

      setIsLoading(false);
    };
  };

  useEffect(
    () => {
      if (!url)
        return;

      executeGetNonPublicVideos();
    },
    [url]
  );

  return (
    <BaseLayout activeOptionId="unavailable">
      <AuthenticationRequiredLayout authCallback={authCallback}>
        <Title
          pt="md"
          align="center"
        >
          Insert your playlist URL
        </Title>
        <NonPublicVideosForm
          handleSearch={handleSearch}
          disabled={isLoading}
        />

        {
          isLoading
            ? <LoadingScreen heightProportion={0.5} />
            : <>
              {
                error
                  ? <li>{error}</li>
                  : null
              }
              {
                videos
                  ? <VideosTable
                    videos={videos}
                    getRemoveVideoHandler={getRemoveVideoHandler}
                  />
                  : null
              }
            </>
        }
      </AuthenticationRequiredLayout>
    </BaseLayout>
  );
};
