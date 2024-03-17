import MoodPieChart from "../MoodPieChart/MoodPieChart";
import MoodSparkline from "../MoodSparkline/MoodSparkline";
import JournalList from "../JournalList/JournalList";
import useAuthStore from "../../stores/authStore";
import { useEffect, useState } from "react";
import { Container, Grid } from "@mantine/core";

const moodMapping = {
  1: { name: "Very Bad", color: "red" },
  2: { name: "Bad", color: "orange" },
  3: { name: "Neutral", color: "yellow" },
  4: { name: "Good", color: "green" },
  5: { name: "Very Good", color: "blue" },
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
      const sparklineData = formattedData.map((moodEntry) => moodEntry.value);
      setMonthlyMoodData(formattedData);
      setSparklineData(sparklineData);
    };
    fetchData().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [token]);

  useEffect(() => {}, []);

  return (
    <Container>
      Hello User!
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          Average Rating: {avg.toFixed(1)}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          {maxMood.value} times you had a {maxMood.name} mood
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <JournalList />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <MoodPieChart data={monthlyMoodData} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <MoodSparkline data={sparlineData} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
