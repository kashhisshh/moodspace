import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import { Grid, Card, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router";
export default function AllJournals() {
  const [journals, setJournals] = useState(null);
  const token = useAuthStore((store) => store.token);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/journal/", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        const data = await response.json();
        setJournals(data.formattedJournals);
      } catch (err) {
        console.log(err);
      } 
    };
    fetchData();
  }, [token]);
  return (
    <div>
      <Grid>
        {journals ? (
          <>
            {journals.map((journal) => (
              <Grid.Col span={6} key={journal._doc._id}>
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
            ))}
          </>
        ) : (
          <Grid.Col>No Journal data available</Grid.Col>
        )}
      </Grid>
    </div>
  );
}
