import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Text, Grid, Paper, Button, Group, Title } from "@mantine/core";
import useAuthStore from "../../stores/authStore";
import classes from "./mood.module.css";
import good from "../../assets/good.jpg";
import bad from "../../assets/bad.jpg";
import veryGood from "../../assets/veryGood.jpg";
import veryBad from "../../assets/verysad.jpg";
import neutral from "../../assets/neutral.jpg";

const mockdata = [
  { title: "Very Bad", img: veryBad, rating: "1" },
  { title: "Bad", img: bad, rating: "2" },
  {
    title: "Neutral",
    img: neutral,
    rating: "3",
  },
  { title: "Good", img: good, rating: "4" },
  {
    title: "Very Good",
    img: veryGood,
    rating: "5",
  },
];

export default function MoodTracker() {
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
    <Grid.Col key={item.title} span={4}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        className={classes.card}
        style={{
          backgroundImage: `url(${item.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        h={200}
      >
        <div>
          <Text className={classes.category} size="md" c="#f5f5f5">
            mood
          </Text>
          <Title order={2} className={classes.title} mb={30}>
            {item.title}
          </Title>
        </div>
        <Button
          variant="white"
          color="dark"
          onClick={() => setMoodRating(item.rating)}
        >
          Select mood
        </Button>
      </Paper>
    </Grid.Col>
  ));

  return (
    <Card className={classes.card} bg="#F0F7F6" p={20}>
      <Group justify="space-between">
        <Title order={1} mb={20}>
          How are you feeling?
        </Title>
      </Group>
      <Grid grow gutter="xl" mb={20}>
        {items}
        <Grid.Col span={12}>
          <Button
            onClick={handleClick}
            fullWidth
            variant="gradient"
            gradient={{ from: "#05372C", to: "#70D560", deg: 90 }}
          >
            <Title order={4}>Submit</Title>
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
