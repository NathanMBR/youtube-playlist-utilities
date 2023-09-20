import {
  Center,
  Loader
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export const LoadingScreen = () => {
  const { height } = useViewportSize();

  return (
    <Center h={height * 0.9}>
      <Loader />
    </Center>
  );
};
