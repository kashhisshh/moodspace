import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DOMPurify from "dompurify";
import "../styles/journalDetail.css";
import useAuthStore from "../stores/authStore";
import {
  Container,
  Title,
  Paper,
  TypographyStylesProvider,
} from "@mantine/core";
export default function JournalDetail() {
  const [entry, setEntry] = useState(null);
  const [title, setTitle] = useState(null);
  const token = useAuthStore((store) => store.token);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/api/journal/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEntry(data.journal.journal);
      setTitle(data.journal.title);
    };
    fetchData();
  }, []);
  return (
    <Container fluid p={20}>
      <Paper shadow="md" p="md" withBorder>
        <Title order={2}>Title: {title ? title : "None"}</Title>
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry) }}
          />
        </TypographyStylesProvider>
      </Paper>
    </Container>
  );
}
