import { Button } from "@mantine/core";
import { useState } from "react";

import { GoogleIcon } from "./GoogleIcon";

export type GoogleAuthButtonProps = {
  href: string;
};

export const GoogleAuthButton = (props: GoogleAuthButtonProps) => {
  const { href } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    window.location.href = href;
  };

  const buttonIcon = <GoogleIcon />;

  return (
    <Button
      variant="default"
      color="gray"
      leftIcon={buttonIcon}
      loading={isLoading}
      onClick={handleClick}
      fullWidth
    >
      Authenticate with Google
    </Button>
  );
};
