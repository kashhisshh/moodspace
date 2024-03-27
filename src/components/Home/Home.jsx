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
  1: { name: "Very Bad", color: "#FF674D" },
  2: { name: "Bad", color: "#7776BC" },
  3: { name: "Neutral", color: "#F5F5F5" },
  4: { name: "Good", color: "#DEEBF4" },
  5: { name: "Very Good", color: "#000D7C" },
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
    <Container my="md" pt={20} m={0} fluid>
      <Title mb={30} mt={30}>
        My Dashboard
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Paper height={PRIMARY_COL_HEIGHT} radius="md" p={20} bg="#DEEBF4">
          <MoodPieChart data={monthlyMoodData} />
          <MoodSparkline data={sparlineData} />
        </Paper>
        <Grid gutter="md">
          <Grid.Col>
            <Paper height={SECONDARY_COL_HEIGHT} bg="#DEEBF4" p={10}>
              <Title order={4} mb={10}>
                Your Journals
              </Title>
              <JournalList />
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper
              withBorder
              radius="md"
              height={SECONDARY_COL_HEIGHT}
              bg="#FF674D"
              p={10}
            >
              <Text size="xl" fw={500} mt="md">
                Average Rating
              </Text>
              <Text size="sm" mt="sm">
                {avg.toFixed(1)}
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper
              withBorder
              radius="md"
              height={SECONDARY_COL_HEIGHT}
              bg="#7776BC"
              p={10}
            >
              <Text size="xl" fw={500} mt="md">
                {maxMood.value} times
              </Text>
              <Text size="sm" mt="sm">
                you had a {maxMood.name} mood
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
