import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import {
  IconMoodHappyFilled,
  IconMoodSadFilled,
  IconMoodNeutralFilled,
  IconMoodEmptyFilled,
  IconMoodSmileFilled,
} from "@tabler/icons-react";
import useAuthStore from "../../stores/authStore";
import classes from "./mood.module.css";

const mockdata = [
  { title: "Very Bad", icon: IconMoodSadFilled, color: "#FF0000", rating: "1" },
  { title: "Bad", icon: IconMoodEmptyFilled, color: "#FFA500", rating: "2" },
  {
    title: "Neutral",
    icon: IconMoodNeutralFilled,
    color: "#FFFF00",
    rating: "3",
  },
  { title: "Good", icon: IconMoodSmileFilled, color: "#008000", rating: "4" },
  {
    title: "Very Good",
    icon: IconMoodHappyFilled,
    color: "#0000FF",
    rating: "5",
  },
];

export default function MoodTracker() {
  const theme = useMantineTheme();
  const [moodRating, setMoodRating] = useState(null);
  const navigate = useNavigate();
  const token = useAuthStore((store) => store.token);

  const handleClick = async () => {
    console.log("Rating", moodRating);
    console.log(token);
    try {
      const response = await fetch("http://localhost:8000/api/mood", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ moodRating }),
      });

      if (!response.ok) {
        throw new Error("Unable to add Mood");
      }
      const data = await response.json();
      console.log("Successfull added mood", data.mood);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      navigate("/dashboard/mood");
    }
  };

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={item.color} size="2rem" />
      <Text
        size="xs"
        mt={7}
        component="button"
        onClick={() => {
          setMoodRating(item.rating);
          console.log("moodRating after update:", moodRating);
        }}
      >
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>How are you feeling today?</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
      <Button onClick={handleClick}>Submit</Button>
    </Card>
  );
}
