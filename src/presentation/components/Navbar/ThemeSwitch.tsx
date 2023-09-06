import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import {
  IconSun,
  IconMoonStars
} from "@tabler/icons-react";

export const ThemeSwitch = () => {
  const {
    colorScheme,
    toggleColorScheme
  } = useMantineColorScheme();

  const handleSwitchChange = () => toggleColorScheme();

  const isSwitchChecked = colorScheme === "dark";

  const theme = useMantineTheme();

  const onLabelIcon = <IconSun
    size="1.25rem"
    color={theme.white}
    stroke={1.5}
  />;

  const offLabelIcon = <IconMoonStars
    color={theme.colors.gray[6]}
    size="1.25rem"
    stroke={1.5}
  />;

  return (
    <Group position="center">
      <Switch
        size="lg"
        onChange={handleSwitchChange}
        checked={isSwitchChecked}
        onLabel={onLabelIcon}
        offLabel={offLabelIcon}
      />
    </Group>
  );
};
