import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  rem,
  useMantineTheme
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { shell } from "@tauri-apps/api";

import { BaseLayout } from "@/presentation/layouts";
import { AuthenticateButton } from "@/presentation/components";

const useStyles = createStyles(
  theme => (
    {
      wrapper: {
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
      },

      inner: {
        position: "relative",
        paddingTop: rem(200),
        paddingBottom: rem(120),

        [theme.fn.smallerThan("sm")]: {
          paddingBottom: rem(80),
          paddingTop: rem(80)
        }
      },

      title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(62),
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [theme.fn.smallerThan("sm")]: {
          fontSize: rem(42),
          lineHeight: 1.2
        }
      },

      description: {
        marginTop: theme.spacing.xl,
        fontSize: rem(24),

        [theme.fn.smallerThan("sm")]: {
          fontSize: rem(18)
        }
      },

      controls: {
        marginTop: `calc(${theme.spacing.xl} * 2)`,

        [theme.fn.smallerThan("sm")]: {
          marginTop: theme.spacing.xl
        }
      },

      control: {
        height: rem(54),
        paddingLeft: rem(38),
        paddingRight: rem(38),

        [theme.fn.smallerThan("sm")]: {
          height: rem(54),
          paddingLeft: rem(18),
          paddingRight: rem(18),
          flex: 1
        }
      }
    }
  )
);

export type HomePageProps = {
  githubRepositoryURL: string;
}

export const HomePage = (props: HomePageProps) => {
  const { githubRepositoryURL } = props;

  const { classes } = useStyles();
  const { colorScheme } = useMantineTheme();

  const handleRepositoryButtonClick = () => {
    shell.open(githubRepositoryURL);
  };

  const githubIcon = <IconBrandGithub size={20} />;

  const textGradientLight = {
    from: "red.9",
    to: "red.6"
  };

  const textGradientDark = {
    from: "red.7",
    to: "red.5"
  };

  const textGradient = colorScheme === "dark"
    ? textGradientDark
    : textGradientLight;

  return (
    <BaseLayout
      activeOptionId="none"
      className={classes.wrapper}
    >
      <Container
        size={700}
        className={classes.inner}
      >
        <h1 className={classes.title}>
          Open-Source utilities for managing <br />

          <Text
            component="span"
            variant="gradient"
            gradient={textGradient}
            inherit
          >
            YouTube Playlists
          </Text>
        </h1>

        <Text
          color="dimmed"
          className={classes.description}
        >
          Authenticate with Google to start checking for unavailable videos, removing them and more
        </Text>

        <Group className={classes.controls}>
          <AuthenticateButton />

          <Button
            size="xl"
            variant="default"
            leftIcon={githubIcon}
            className={classes.control}
            onClick={handleRepositoryButtonClick}
          >
            Source Code
          </Button>
        </Group>
      </Container>
    </BaseLayout>
  );
};
