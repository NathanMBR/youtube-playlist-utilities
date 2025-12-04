import {
  ActionIcon,
  Box,
  Table,
  Text,
  Tooltip
} from "@mantine/core";
import {
  IconTrash,
  IconReplace
} from "@tabler/icons-react";

import { Video } from "@/domain/models";

export type VideosTableProps = {
  noVideosMessage: string;
  videos: Array<Video>;
  getRemoveVideoHandler: (videoId: string) => () => void;
  getSubstituteVideoHandler: (videoId: string) => () => void;
  disableRemoveVideosButton?: boolean;
}

export const VideosTable = (props: VideosTableProps) => {
  const {
    noVideosMessage,
    videos,
    getRemoveVideoHandler,
    getSubstituteVideoHandler
  } = props;

  if (videos.length <= 0)
    return (
      <Text mt={16}>{noVideosMessage}</Text>
    );

  return (
    <Table
      miw={500}
      mt={16}
      verticalSpacing="sm"
      striped
    >
      <thead>
        <tr>
          <th style={{ textAlign: "center", width: 64 }}>Position</th>
          <th>Title</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          videos.map(
            video => <tr key={video.id}>
              <td style={{ textAlign: "center" }}>{video.snippet.position + 1}</td>
              <td>{video.snippet.title}</td>
              <td>
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                  <Tooltip label="Substitute video">
                    <ActionIcon onClick={getSubstituteVideoHandler(video.id)}>
                      <IconReplace />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Remove video">
                    <ActionIcon onClick={getRemoveVideoHandler(video.id)}>
                      <IconTrash />
                    </ActionIcon>
                  </Tooltip>
                </Box>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
};
