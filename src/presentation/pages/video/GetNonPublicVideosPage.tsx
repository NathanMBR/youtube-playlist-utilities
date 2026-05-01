import {
  useState,
  useEffect
} from "react";
import {
  LoadingOverlay,
  Title
} from "@mantine/core";

import {
  GetAuthCallback,
  GetNonPublicVideos,
  RemoveVideo,
  SubstituteVideo
} from "@/domain/usecases";
import {
  BaseLayout,
  AuthenticationRequiredLayout
} from "@/presentation/layouts";
import {
  NonPublicVideosForm,
  VideosTable,
  ErrorAlert,
  SubstituteVideoModal
} from "@/presentation/components";
import { Video } from "@/domain/models";

export type GetNonPublicVideosPageProps = {
  getAuthCallback: GetAuthCallback;
  getNonPublicVideos: GetNonPublicVideos;
  removeVideo: RemoveVideo;
  substituteVideo: SubstituteVideo;
}

export const GetNonPublicVideosPage = (props: GetNonPublicVideosPageProps) => {
  const {
    getAuthCallback,
    getNonPublicVideos,
    removeVideo,
    substituteVideo
  } = props;

  const authCallback = getAuthCallback.execute();

  const [videos, setVideos] = useState<Array<Video> | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [substituteModalOpened, setSubstituteModalOpened] = useState(false);
  const [selectedVideoForSubstitution, setSelectedVideoForSubstitution] = useState<Video | null>(null);
  const [substituteError, setSubstituteError] = useState("");

  const handleSearch = async (url: string) => {
    setUrl(url);
  };

  const handleCloseErrorAlert = () => {
    setError("");
  };

  const executeGetNonPublicVideos = async () => {
    setIsLoading(true);

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
      setVideos(null);
      return;
    }

    setVideos(nonPublicVideosResponse.data);
    setError("");
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
    };
  };

  const getSubstituteVideoHandler = (videoId: string) => {
    return () => {
      const videoToSubstitute = videos?.find(v => v.id === videoId);
      if (!videoToSubstitute)
        return;

      setSelectedVideoForSubstitution(videoToSubstitute);
      setSubstituteModalOpened(true);
      setSubstituteError("");
    };
  };

  const handleSubstituteVideo = async (substituteVideoId: string) => {
    if (!selectedVideoForSubstitution) return;

    const substituteVideoResponse = await substituteVideo.execute({
      id: selectedVideoForSubstitution.id,
      substituteId: substituteVideoId,
      position: selectedVideoForSubstitution.snippet.position,
      playlistId: selectedVideoForSubstitution.snippet.playlistId,
      authToken: authCallback!.accessToken
    });

    if (!substituteVideoResponse.success) {
      type PossibleErrors = typeof substituteVideoResponse.error;

      const errorMessages: Record<PossibleErrors, string> = {
        INVALID_ID: "Invalid video ID",
        INVALID_SUBSTITUTE_ID: "Invalid substitute video ID",
        NOT_FOUND: "Original video not found in playlist",
        SUBSTITUTE_NOT_FOUND: "Substitute video not found or not available",
        UNAUTHORIZED: "You can't modify a playlist that isn't yours"
      };

      setSubstituteError(errorMessages[substituteVideoResponse.error]);
      return;
    }

    await executeGetNonPublicVideos();
    setSubstituteModalOpened(false);
    setSelectedVideoForSubstitution(null);
  };

  const handleSubstituteModalClose = () => {
    setSubstituteModalOpened(false);
    setSelectedVideoForSubstitution(null);
    setSubstituteError("");
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
          error
            ? <ErrorAlert
              message={error}
              handleCloseAlert={handleCloseErrorAlert}
            />
            : null
        }

        <LoadingOverlay visible={isLoading} transitionDuration={250} />

        {
          videos
            ? <VideosTable
              noVideosMessage="This playlist doesn't have unavailable videos."
              videos={videos}
              getRemoveVideoHandler={getRemoveVideoHandler}
              getSubstituteVideoHandler={getSubstituteVideoHandler}
            />
            : null
        }

        <SubstituteVideoModal
          opened={substituteModalOpened}
          onClose={handleSubstituteModalClose}
          onSubstitute={handleSubstituteVideo}
          videoTitle={selectedVideoForSubstitution?.snippet.title}
          isLoading={isLoading}
          error={substituteError}
        />

      </AuthenticationRequiredLayout>
    </BaseLayout>
  );
};
