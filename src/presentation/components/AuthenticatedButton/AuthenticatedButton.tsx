import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

const useStyles = createStyles(
  theme => (
    {
      user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        borderRadius: theme.radius.md,

        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      }
    }
  )
);

export type AuthenticatedButtonProps = {
  imageURL: string;
  name: string;
}

export const AuthenticatedButton = (props: AuthenticatedButtonProps) => {
  const {
    imageURL,
    name
  } = props;

  const { classes } = useStyles();

  const handleLogout = () => {
    window.localStorage.removeItem("auth-callback");
    window.location.reload();
  };

  const getShorterName = (name: string): string => {
    const spaceCharacter = String.fromCharCode(32);

    let lastNamePartIndex = 1;

    const filterFirstTwoNameParts = (namePart: string, index: number): boolean => {
      const shouldKeepNamePart = index <= lastNamePartIndex;

      const maximumNamePartLengthToIncreaseLastIndex = 4;
      if (namePart.length <= maximumNamePartLengthToIncreaseLastIndex)
        lastNamePartIndex++;

      return shouldKeepNamePart;
    };

    const shorterName = name
      .split(spaceCharacter)
      .filter(filterFirstTwoNameParts)
      .join(spaceCharacter);

    return shorterName;
  };

  return (
    <UnstyledButton
      className={classes.user}
      onClick={handleLogout}
    >
      <Group>
        <Avatar
          src={imageURL}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text
            size="sm"
            weight={500}
          >
            { getShorterName(name) }
          </Text>

          <Text size="xs">
            Click to logout
          </Text>
        </div>

        <IconLogout
          size="1.25rem"
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
};
