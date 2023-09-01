export type DataVideoThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type DataVideo = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: DataVideoThumbnail;
      medium: DataVideoThumbnail;
      high: DataVideoThumbnail;
      standard: DataVideoThumbnail;
      maxres: DataVideoThumbnail;
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
