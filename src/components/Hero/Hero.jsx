import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Grid,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../../assets/openMind.png";
import classes from "./hero.module.css";
import { Link } from "react-router-dom";
import openMind from "../../assets/openMind.png";

export default function HeroComponent() {
  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={6}>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Your Personal{" "}
                <span className={classes.highlight}>Mental Health</span> Toolkit
              </Title>
              <Text c="dimmed" mt="md">
                Simple tools to track your wellbeing, express your thoughts in a
                safe space, and access helpful resources tailored to you.
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Mood Tracker</b> – Intuitive mood tracker with customizable
                  options.
                </List.Item>
                <List.Item>
                  <b>Journalling Editor</b> – Secure journaling space with
                  prompts and tools for self-expression.
                </List.Item>
                <List.Item>
                  <b>Mental Health Resources</b> – Curated selection of trusted
                  mental health resources, articles, and helplines.
                </List.Item>
              </List>

              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control}>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "#f5f5f5" }}
                  >
                    Get started
                  </Link>
                </Button>
              </Group>
            </div>
            <Image src={image.src} className={classes.image} />
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <Image src={openMind} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
