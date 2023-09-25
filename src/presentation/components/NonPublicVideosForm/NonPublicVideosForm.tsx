import {
  TextInput,
  ActionIcon,
  useMantineTheme,
  rem
} from "@mantine/core";
import {
  IconSearch,
  IconArrowRight
} from "@tabler/icons-react";
import { CSSProperties } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import { zodGetNonPublicVideosSchema } from "@/infra/validators";

type NonPublicVideosFormData = zod.infer<typeof zodGetNonPublicVideosSchema>;

export type NonPublicVideosFormProps = {
  handleSearch: (inputText: string) => void;
  disabled?: boolean;
}

export const NonPublicVideosForm = (props: NonPublicVideosFormProps) => {
  const {
    handleSearch,
    disabled
  } = props;

  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    formState
  } = useForm<NonPublicVideosFormData>(
    {
      resolver: zodResolver(zodGetNonPublicVideosSchema)
    }
  );

  const iconStyle: CSSProperties = {
    width: rem(18),
    height: rem(18)
  };

  const searchIcon = <IconSearch
    stroke={1.5}
    style={iconStyle}
  />;

  const handleSubmitButtonClick = handleSubmit(
    payload => handleSearch(payload.playlistURL)
  );

  const submitButton = <ActionIcon
    radius="xl"
    variant="filled"
    size={32}
    color={theme.primaryColor}
    onClick={handleSubmitButtonClick}
  >
    <IconArrowRight
      stroke={1.5}
      style={iconStyle}
    />
  </ActionIcon>;

  return (
    <>
      <TextInput
        pt="sm"
        radius="xl"
        size="md"
        placeholder="Playlist URL"
        rightSectionWidth={42}
        icon={searchIcon}
        rightSection={submitButton}
        disabled={disabled}
        error={formState.errors.playlistURL?.message}
        {...register("playlistURL")}
      />
    </>
  );
};
