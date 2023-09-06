import {
  IconEyeOff,
  IconBrandGoogle
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
      label: "Check a playlist for unavailable videos",
      link: "/playlist/unavailable",
      icon: IconEyeOff
    },

    {
      label: "Authenticate with Google",
      link: "/auth",
      icon: IconBrandGoogle
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
