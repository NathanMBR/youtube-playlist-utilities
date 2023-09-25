import {
  Center,
  Loader
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export type LoadingScreenProps = {
  heightProportion?: number;
};

export const LoadingScreen = (props: LoadingScreenProps) => {
  const { heightProportion = 0.9 } = props;

  const { height } = useViewportSize();

  return (
    <Center h={height * heightProportion}>
      <Loader />
    </Center>
  );
};
