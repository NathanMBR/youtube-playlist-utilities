import {
  IconEyeOff,
  IconSettings
} from "@tabler/icons-react";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

import {
  Navbar,
  NavbarProps
} from "@/presentation/components";

export type BaseLayoutProps = {
  className?: string;
  children: ReactNode;
};

export const BaseLayout = (props: BaseLayoutProps) => {
  const {
    className,
    children
  } = props;

  const options: NavbarProps["options"] = [
    {
      label: "Get Non-public videos of a playlist",
      link: "/non-public-videos",
      icon: IconEyeOff
    },

    {
      label: "Set Google Token",
      link: "/token",
      icon: IconSettings
    }
  ];

  const navbar = <Navbar
    version="v0.0.1"
    options={options}
  />;

  return (
    <AppShell
      navbar={navbar}
      className={className}
    >
      { children }
    </AppShell>
  );
};
