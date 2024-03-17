import { PieChart } from "@mantine/charts";
import { Stack, Text } from "@mantine/core";
import { DonutChart } from '@mantine/charts';

export default function MoodPieChart({ data }) {
  return (
    <div>
      {data ? (
        <Stack gap="sm">
          <DonutChart data={data} chartLabel="Monthly moods" tooltipDataSource="segment" mx="auto"/>
        </Stack>
      ) : (
        <div>No mood data found for this month.</div>
      )}
    </div>
  );
}
