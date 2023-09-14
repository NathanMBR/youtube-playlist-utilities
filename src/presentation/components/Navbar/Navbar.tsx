import {
  Navbar as MantineNavbar,
  createStyles,
  Group,
  Code,
  getStylesRef,
  rem,
  Title
} from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { ThemeSwitch } from "./ThemeSwitch";

const useStyles = createStyles(
  theme => {
    return {
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
          theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`
      },

      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`
      },

      link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === "dark" ? theme.white : theme.black,

          [`& .${getStylesRef("icon")}`]: {
            color: theme.colorScheme === "dark" ? theme.white : theme.black
          }
        }
      },

      linkIcon: {
        ref: getStylesRef("icon"),
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
          color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
          [`& .${getStylesRef("icon")}`]: {
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color
          }
        }
      }
    };
  }
);

type Option<T extends string = string> = {
  link: string;
  label: string;
  icon: Icon;
  activeId: T;
}

export type NavbarProps<T extends string = string> = {
  version: string;
  options: Array<Option<T>>;
  activeOptionId?: T;
}

export const Navbar = (props: NavbarProps) => {
  const {
    version,
    options,
    activeOptionId
  } = props;

  const { classes, cx } = useStyles();

  const getLinkClassName = (item: Option) => cx(
    classes.link,

    {
      [classes.linkActive]: item.activeId === activeOptionId
    }
  );

  const links = options.map(
    item => (
      <Link
        to={item.link}
        key={item.label}
        className={getLinkClassName(item)}
      >
        <item.icon
          className={classes.linkIcon}
          stroke={1.5}
        />

        <span>{item.label}</span>
      </Link>
    )
  );

  const cleanLinkStyle = {
    color: "inherit",
    textDecoration: "inherit"
  };

  return (
    <MantineNavbar
      p="md"
      width={{ sm: 300 }}
    >
      <MantineNavbar.Section grow>
        <Group
          position="apart"
          className={classes.header}
        >
          <Link
            to="/"
            style={cleanLinkStyle}
          >
            <Title size={16}>Youtube Playlist Utilities</Title>
          </Link>

          <Code sx={{ fontWeight: 700 }}>{version}</Code>
        </Group>

        {
          links
        }
      </MantineNavbar.Section>

      <MantineNavbar.Section>
        <ThemeSwitch />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
