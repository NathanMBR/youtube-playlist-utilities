import {
  UnstyledButton,
  Group,
  createStyles
} from "@mantine/core";
import { ReactNode } from "react";

export type AuthenticatedButtonRootProps = {
  handleLogout?: () => any;
  children: ReactNode;
}

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

export const AuthenticatedButtonRoot = (props: AuthenticatedButtonRootProps) => {
  const {
    handleLogout,
    children
  } = props;

  const { classes } = useStyles();

  return (
    <UnstyledButton
      className={classes.user}
      onClick={handleLogout}
    >
      <Group>
        {
          children
        }
      </Group>
    </UnstyledButton>
  );
};
