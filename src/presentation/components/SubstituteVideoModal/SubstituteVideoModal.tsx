import {
  Modal,
  TextInput,
  Button,
  Group,
  Text
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { useState } from "react";

const youtubeUrlSchema = zod.object({
  videoUrl: zod.string()
    .min(1, "Video URL is required")
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      "Invalid YouTube video URL"
    )
});

type SubstituteVideoFormData = zod.infer<typeof youtubeUrlSchema>;

export type SubstituteVideoModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubstitute: (videoId: string) => Promise<void>;
  videoTitle?: string;
  isLoading?: boolean;
  error?: string;
}

export const SubstituteVideoModal = (props: SubstituteVideoModalProps) => {
  const {
    opened,
    onClose,
    onSubstitute,
    videoTitle,
    isLoading = false,
    error
  } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<SubstituteVideoFormData>({
    resolver: zodResolver(youtubeUrlSchema)
  });

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] || null;
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const videoId = extractVideoId(data.videoUrl);
      if (!videoId)
        return;
      await onSubstitute(videoId);
      reset();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleModalClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleModalClose}
      title="Substitute Video"
      size="md"
    >
      <form onSubmit={handleFormSubmit}>
        {videoTitle && (
          <Text size="sm" mb="md" c="dimmed">
            Substituting: {videoTitle}
          </Text>
        )}

        <TextInput
          label="YouTube Video URL"
          placeholder="https://www.youtube.com/watch?v=..."
          error={formState.errors.videoUrl?.message}
          disabled={isLoading || isSubmitting}
          mb="md"
          {...register("videoUrl")}
        />

        {error && (
          <Text color="red" size="sm" mb="md">
            {error}
          </Text>
        )}

        <Group position="right">
          <Button
            variant="subtle"
            onClick={handleModalClose}
            disabled={isLoading || isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading || isSubmitting}
          >
            Substitute
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
