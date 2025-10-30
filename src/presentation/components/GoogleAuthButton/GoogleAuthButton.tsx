import { Button } from "@mantine/core";
import { shell } from "@tauri-apps/api";
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

    if (!!window.__TAURI__)
      return shell.open(href);

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
