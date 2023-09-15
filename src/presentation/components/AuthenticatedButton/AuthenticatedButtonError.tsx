import {
  Container,
  Text
} from "@mantine/core";

export const AuthenticatedButtonError = () => {
  return (
    <>
      <Container p="md">
        <Text align="center">Authentication error</Text>
      </Container>
    </>
  );
};
