import cx from "clsx";
import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
  Button,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSettings, IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ToggleTheme from "../ToogleTheme/ToggleTheme";
import classes from "./navbar.module.css";
import useAuthStore from "../../stores/authStore";

export default function Navbar({ isLoggedIn }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const uname = useAuthStore((store) => store.uname);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Title order={3} className={classes.logo}>
            MoodSpace
          </Title>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          {isLoggedIn ? (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar alt={uname} radius="xl" size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {uname}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                  component={Link}
                  to="/logout"
                >
                  Logout
                </Menu.Item>

                <Menu.Divider />
              </Menu.Dropdown>
              <ToggleTheme />
            </Menu>
          ) : (
            <Group visibleFrom="xs">
              <ToggleTheme />
              <Button component={Link} to="/login" bg="#7776BC">
                Login
              </Button>
              <Button component={Link} to="/register" bg="#FF674D">
                Register
              </Button>
            </Group>
          )}
        </Group>
      </Container>
    </div>
  );
}
