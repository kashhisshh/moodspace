import { useState } from "react";
import { Group, ScrollArea } from "@mantine/core";
import {
  IconGauge,
  IconNotebook,
  IconMoodHappyFilled,
  IconLogout,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./nav.module.css";

import { Box, NavLink } from "@mantine/core";
const data = [
  { icon: IconGauge, label: "Dashboard", link: "" },
  {
    icon: IconNotebook,
    label: "Journal",
    link: "/journal",
  },
  { icon: IconMoodHappyFilled, label: "Mood", link: "/mood" },
];

export default function Navigation() {
  let navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Optional: Send logout request to your backend endpoint
      // await fetch('/logout');
      localStorage.removeItem("token");

      navigate("/"); // Redirect to home
    } catch (error) {
      // Handle any errors that might occur
      navigate("/dashboard");
      console.error(error);
    }
  };
  const [active, setActive] = useState(0);
  const items = data.map((item, index) => (
    <NavLink
      component={Link}
      to={{ pathname: `/dashboard${item.link}` }}
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      color="cyan"
    />
  ));

  return (
    <nav className={classes.navbar} style={{maxHeight: "100%"}}>
      <div className={classes.header}>
        <Group justify="space-between">MoodSpace</Group>
      </div>

      <ScrollArea className={classes.links}>
        <Box w={220}>
          {items}
          <NavLink
            component={Link}
            to="/logout" // Point to the logout route
            label="Logout"
            leftSection={<IconLogout />}
          />
        </Box>
      </ScrollArea>
    </nav>
  );
}
