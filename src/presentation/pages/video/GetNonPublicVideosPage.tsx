import {
  Title
} from "@mantine/core";
import { useState } from "react";

import {
  GetAuthCallback,
  GetNonPublicVideos
} from "@/domain/usecases";
import {
  BaseLayout,
  AuthenticationRequiredLayout
} from "@/presentation/layouts";
import { NonPublicVideosForm } from "@/presentation/components";
import { Video } from "@/domain/models";

export type GetNonPublicVideosPageProps = {
  getAuthCallback: GetAuthCallback;
  getNonPublicVideos: GetNonPublicVideos;
}

export const GetNonPublicVideosPage = (props: GetNonPublicVideosPageProps) => {
  const {
    getAuthCallback,
    getNonPublicVideos
  } = props;

  const authCallback = getAuthCallback.execute();

  const [videos, setVideos] = useState<Array<Video> | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (url: string) => {
    setIsLoading(true);

    const nonPublicVideosResponse = await getNonPublicVideos.execute(
      {
        playlistURL: url,
        authToken: authCallback!.accessToken
      }
    );

    if (!nonPublicVideosResponse.success)
      return setError(nonPublicVideosResponse.error);

    setVideos(nonPublicVideosResponse.data);

    setIsLoading(false);
  };

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
        {error && <li>{error}</li>}
        {
          videos && <ul>
            {
              videos.map(video => <li key={video.id}>{video.snippet.title}</li>)
            }
          </ul>
        }
      </AuthenticationRequiredLayout>
    </BaseLayout>
  );
};
