import { Sparkline } from "@mantine/charts";

import classes from "./sparkline.module.css";
import { Stack, Text } from "@mantine/core";
export default function MoodSparkline({ data }) {
  return (
    <div>
      {data ? (
        <Stack gap="sm">
          <Text mt="md">Mood trend:</Text>
          <Sparkline
            data={data}
            w={200}
            h={60}
            mx="auto"
            className={classes.root}
          />
        </Stack>
      ) : (
        <div>No mood data found for this month.</div>
      )}
    </div>
    
  );
}
