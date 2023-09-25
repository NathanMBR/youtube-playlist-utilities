import {
  Table,
  ActionIcon,
  Tooltip
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { Video } from "@/domain/models";

export type VideosTableProps = {
  videos: Array<Video>;
  getRemoveVideoHandler: (videoId: string) => () => void;
  disableRemoveVideosButton?: boolean;
}

export const VideosTable = (props: VideosTableProps) => {
  const {
    videos,
    getRemoveVideoHandler
  } = props;

  return (
    <Table
      miw={700}
      mt={16}
    >
      <thead>
        <tr>
          <th>Title</th>
          <th>Playlist position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          videos.map(
            video => <tr key={video.id}>
              <td>{video.snippet.title}</td>
              <td>{video.snippet.position + 1}</td>
              <td>
                <Tooltip label="Remove video">
                  <ActionIcon onClick={getRemoveVideoHandler(video.id)}>
                    <IconTrash />
                  </ActionIcon>
                </Tooltip>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
};
