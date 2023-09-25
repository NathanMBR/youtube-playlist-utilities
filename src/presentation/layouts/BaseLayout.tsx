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

export type BaseLayoutActiveOptionId =
  "unavailable" |
  "auth" |
  "none";

export type BaseLayoutProps = {
  activeOptionId: BaseLayoutActiveOptionId;
  className?: string;
  children: ReactNode;
};

export const BaseLayout = (props: BaseLayoutProps) => {
  const {
    activeOptionId,
    className,
    children
  } = props;

  const options: NavbarProps<BaseLayoutActiveOptionId>["options"] = [
    {
      activeId: "unavailable",
      label: "Check for unavailable videos",
      link: "/playlist/unavailable",
      icon: IconEyeOff
    },

    {
      activeId: "auth",
      label: "Authenticate with Google",
      link: "/auth",
      icon: IconBrandGoogle
    }
  ];

  const navbar = <Navbar
    version="v1.0.0"
    options={options}
    activeOptionId={activeOptionId}
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
