import React, { useState } from "react";
import { Button, Group } from "@mantine/core";

const moodEmojis = {
  1: "😫", // Very bad
  2: "🙁", // Bad
  3: "😐", // Neutral
  4: "🙂", // Good
  5: "😁", // Very good
};

const MoodTracker = () => {
  const [moodRating, setMoodRating] = useState(null);

  return (
    <div>
      <Group spacing="xs">
        {" "}
        {/* Group for layout */}
        {Object.keys(moodEmojis).map((rating) => (
          <Button
            key={rating}
            variant="light"
            radius="xl"
            color={moodRating === parseInt(rating, 10) ? "teal" : undefined} // Highlight selected
            onClick={() => setMoodRating(parseInt(rating, 10))}
          >
            {moodEmojis[rating]}
          </Button>
        ))}
      </Group>
    </div>
  );
};

export default MoodTracker;
