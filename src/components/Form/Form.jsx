import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Grid,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./Form.module.css";

export default function Form({
  type,
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  img,
}) {
  return (
    <Grid>
      <Grid.Col span={6}>
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={50}>
            <Title
              order={2}
              className={classes.title}
              ta="center"
              mt="md"
              mb={50}
            >
              {type === "Login"
                ? "Welcome back to MoodSpace"
                : "Welcome to Moodspace, Register"}
            </Title>

            <TextInput
              label="Email address"
              name="username"
              value={username}
              placeholder="hello@gmail.com"
              size="md"
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              label="Password"
              name="password"
              value={password}
              placeholder="Your password"
              mt="md"
              size="md"
              onChange={(e) => setPassword(e.target.value)}
            />
            {type === "Login" ? (
              <Button fullWidth mt="xl" size="md" onClick={onSubmit}>
                Login
              </Button>
            ) : (
              <Button fullWidth mt="xl" size="md" onClick={onSubmit}>
                Register
              </Button>
            )}

            {type === "Login" ? (
              <Text ta="center" mt="md">
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </Text>
            ) : (
              <Text ta="center" mt="md">
                Already have an account? <Link to="/login">Login</Link>
              </Text>
            )}
          </Paper>
        </div>
      </Grid.Col>
      <Grid.Col span={6}>
        <Image src={img} height={660} />
      </Grid.Col>
    </Grid>
  );
}
