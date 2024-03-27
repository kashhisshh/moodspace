import { Container, Group, Burger, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import ToggleTheme from "../ToogleTheme/ToggleTheme";
import classes from "./navbar.module.css";

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Title order={3} className={classes.logo}>
            <Link to="/" style={{ textDecoration: "none" }}>
              MoodSpace
            </Link>
          </Title>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Group visibleFrom="xs">
            <ToggleTheme />
            <Button component={Link} to="/login" bg="#7776BC">
              Login
            </Button>
            <Button component={Link} to="/register" bg="#FF674D">
              Register
            </Button>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
