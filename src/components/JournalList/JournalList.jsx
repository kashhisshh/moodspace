import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import { Grid, Card, Text, Button, Skeleton } from "@mantine/core";
import { useNavigate } from "react-router";

export default function JournalList() {
  const [journals, setJournals] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((store) => store.token);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("http://localhost:8000/api/journal/limit", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json(); // Use await here
      console.log(data);
      setJournals(data.formattedJournals);
      }catch(err){
        console.log(err);
      }finally{
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <Grid>
        {isLoading ? (
          // Display Skeleton Loaders while loading
          [1, 2, 3].map(
            (
              index // Render 3 skeleton cards
            ) => (
              <Grid.Col span={4} key={`skeleton-${index}`}>
                <Card shadow="sm" p="lg">
                  <Skeleton height={20} radius="md" mb="sm" />
                  <Skeleton height={8} radius="md" width="70%" mb="sm" />
                  <Skeleton height={8} radius="md" width="50%" />
                  <Skeleton height={30} radius="md" mt="md" />
                </Card>
              </Grid.Col>
            )
          )
        ) : journals ? (
          journals.map((journal) => (
            <Grid.Col span={4} key={journal._doc._id}>
              {" "}
              {/* Adjust column span as needed */}
              <Card shadow="sm" p="lg">
                <Card.Section>
                  <Text weight={500}>{journal.title}</Text>
                </Card.Section>

                <Text size="sm" color="dimmed">
                  {journal.preview}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() =>
                    navigate(`/dashboard/journal/${journal._doc._id}`)
                  }
                >
                  See Full Journal
                </Button>
              </Card>
            </Grid.Col>
          ))
        ) : (
          <Grid.Col>No Journal data available</Grid.Col>
        )}
      </Grid>
    </div>
  );
}
