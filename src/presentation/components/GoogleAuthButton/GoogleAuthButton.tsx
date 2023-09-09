import { Button } from "@mantine/core";
import {
  ReactNode,
  CSSProperties
} from "react";

import { GoogleIcon } from "./GoogleIcon";

export type GoogleAuthButtonProps = {
  href: string;
  children?: ReactNode;
};

export const GoogleAuthButton = (props: GoogleAuthButtonProps) => {
  const {
    href,
    children
  } = props;

  const linkStyle: CSSProperties = {
    color: "inherit",
    textDecoration: "none"
  };

  const buttonIcon = <GoogleIcon />;

  return (
    <a
      href={href}
      style={linkStyle}
    >
      <Button
        variant="default"
        color="gray"
        leftIcon={buttonIcon}
        fullWidth
      >
        { children }
      </Button>
    </a>
  );
};
