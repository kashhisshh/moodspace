import MoodPieChart from "../MoodPieChart/MoodPieChart";
import MoodSparkline from "../MoodSparkline/MoodSparkline";
import JournalList from "../JournalList/JournalList";
import useAuthStore from "../../stores/authStore";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Text,
  Title,
  Paper,
  SimpleGrid,
  rem,
} from "@mantine/core";

const moodMapping = {
  1: { name: "Very Bad", color: "#d52941" },
  2: { name: "Bad", color: "#504f9d" },
  3: { name: "Neutral", color: "#e1f296" },
  4: { name: "Good", color: "#70D560" },
  5: { name: "Very Good", color: "#05372C" },
};

export default function Home() {
  const token = useAuthStore((store) => store.token);
  const [sparlineData, setSparklineData] = useState(null);
  const [monthlyMoodData, setMonthlyMoodData] = useState(null);
  const [avg, setAvg] = useState(0);
  const [maxMood, setMaxMood] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/mood/monthly/2024",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const moodCounts = {};
      console.log(data.moods);
      data.moods.forEach((mood) => {
        moodCounts[mood.rating] = (moodCounts[mood.rating] || 0) + 1;
      });

      const ratings = data.moods.map((entry) => entry.rating);

      const sum = ratings.reduce((total, rating) => total + rating, 0);

      const averageRating = sum / ratings.length;
      setAvg(averageRating);

      const formattedData = Object.entries(moodCounts).map(
        ([rating, count]) => ({
          name: moodMapping[rating].name,
          value: count,
          color: moodMapping[rating].color,
        })
      );

      const maxEntry = formattedData.reduce(
        (max, entry) => (entry.value > max.value ? entry : max),
        { value: -Infinity } // Initial value with a very low 'value'
      );
      setMaxMood(maxEntry);
      setMonthlyMoodData(formattedData);
      setSparklineData(ratings);
    };
    fetchData().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [token]);
  const PRIMARY_COL_HEIGHT = rem(1000);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  return (
    <Container my="md" p={20} m={0} fluid bg="#f0f7f6">
      <Title mb={30} mt={30}>
        My Dashboard
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Paper height={PRIMARY_COL_HEIGHT} radius="md" p={20} bg="#fff">
          <MoodPieChart data={monthlyMoodData} />
          <MoodSparkline data={sparlineData} />
        </Paper>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Paper
              withBorder
              radius="md"
              height={SECONDARY_COL_HEIGHT}
              bg="#D52941"
              p={20}
            >
              <Title order={1} c="white">
                {avg.toFixed(1)}
              </Title>
              <Text size="sm" fw={500} c="#DCD6F7">
                Average Rating
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper
              withBorder
              radius="md"
              height={SECONDARY_COL_HEIGHT}
              bg="#504F9D"
              p={20}
            >
              <Title order={1} c="white">
                {maxMood.value} times
              </Title>
              <Text size="sm" fw={500} c="#DCD6F7">
                you had a {maxMood.name} mood
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col>
            <Paper height={SECONDARY_COL_HEIGHT} bg="#fff" p={15}>
              <Title order={3} mb={10}>
                Your Journals
              </Title>
              <JournalList />
            </Paper>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
