import { Button } from "@mantine/core";
import { ReactNode } from "react";

import { GoogleIcon } from "./GoogleIcon";

export type GoogleAuthButtonProps = {
  children?: ReactNode;
};

export const GoogleAuthButton = (props: GoogleAuthButtonProps) => {
  const { children } = props;

  const buttonIcon = <GoogleIcon />;

  return (
    <>
      <Button
        variant="default"
        color="gray"
        leftIcon={buttonIcon}
        fullWidth
      >
        { children }
      </Button>
    </>
  );
};
