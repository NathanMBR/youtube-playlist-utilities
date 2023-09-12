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

    /*
      Motivation:
      When manually changing the current URL, Tauri WebView will freeze the page and not properly update its state.
      This little delay is a workaround so that the user can have some feedback about the button click.
      Despite that, the loading spinner animation will freeze too.
    */
    const delayInMilliseconds = 50;
    setTimeout(
      () => {
        window.location.href = href;
      },

      delayInMilliseconds
    );
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
