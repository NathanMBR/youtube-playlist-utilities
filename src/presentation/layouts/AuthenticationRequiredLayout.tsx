import {
  createStyles,
  rem,
  Card,
  Text,
  Container,
  Center,
  Stack
} from "@mantine/core";
import { ReactNode } from "react";
import { useViewportSize } from "@mantine/hooks";

import { AuthCallback } from "@/domain/models";
import { AuthenticateButton } from "@/presentation/components";

const useStyles = createStyles(
  theme => (
    {
      root: {
        paddingTop: rem(80),
        paddingBottom: rem(80)
      },

      card: {
        backgroundColor: theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.white
      }
    }
  )
);

export type AuthenticationRequiredLayoutProps = {
  authCallback: AuthCallback | null;
  children: ReactNode;
}

export const AuthenticationRequiredLayout = (props: AuthenticationRequiredLayoutProps) => {
  const {
    authCallback,
    children
  } = props;

  const { classes } = useStyles();
  const { width } = useViewportSize();

  if (!authCallback)
    return (
      <Container
        w={width * 0.5}
        pt={32}
      >
        <Card
          p="xl"
          radius="md"
          className={classes.card}
          withBorder
        >
          <Stack>
            <Center>
              <Text
                fz="lg"
                fw={500}
              >
                This resource requires authentication to proceed.
              </Text>
            </Center>

            <Center>
              <AuthenticateButton />
            </Center>
          </Stack>
        </Card>
      </Container>
    );

  return (
    <>
      {children}
    </>
  );
};
