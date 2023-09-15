import {
  Skeleton,
  Text
} from "@mantine/core";
import { CSSProperties } from "react";
import { IconLogout } from "@tabler/icons-react";

export const AuthenticatedButtonLoading = () => {
  const divStyle: CSSProperties = {
    flex: 1
  };

  return (
    <>
      <Skeleton
        height={32}
        circle
      />

      <div style={divStyle}>
        <Skeleton
          radius="xl"
          width={100}
          height={8}
          mb={6}
        />

        <Text size="xs">Click to logout</Text>
      </div>

      <IconLogout
        size="1.25rem"
        stroke={1.5}
      />
    </>
  );
};
