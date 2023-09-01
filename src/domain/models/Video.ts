export type VideoThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Video = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: VideoThumbnail;
      medium: VideoThumbnail;
      high: VideoThumbnail;
      standard: VideoThumbnail;
      maxres: VideoThumbnail;
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
  status: {
    privacyStatus: string;
  };
};
