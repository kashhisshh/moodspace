import * as data from "../resources.json";
import BadgeCard from "../components/BadgeCard/BadgeCard";
import { Grid, Space, Title} from "@mantine/core";
import howwefeel from "../assets/howwefeel.png";
import calm from "../assets/calmharm.png";
import minddoc from "../assets/minddoc.png";
import fabulous from "../assets/Fabulous.png";
import Dbt911 from "../assets/Dbt911.png";

const imgData = [
  {
    id: "1",
    img: howwefeel,
  },
  {
    id: "2",
    img: minddoc,
  },
  {
    id: "3",
    img: fabulous,
  },
  {
    id: "4",
    img: calm,
  },
  {
    id:"5",
    img: Dbt911
  }
];

export default function Apps() {
    console.log(howwefeel, calm, minddoc, fabulous);  
  const apps = data.apps.map((app, index) => {
    return (
      // Add the return statement
      <Grid.Col
        key={app.id}
        span={{ base: 12, md: 6, lg: 3 }}
        overflow="hidden"
      >
        <BadgeCard
          title={app.name}
          link={app.link}
          img={imgData[index].img}
          isBook={false}
          action="Get app"
        />
      </Grid.Col>
    );
  });
  return (
    <div>
      <Title order={1}>Apps</Title>
      <Space h="md" />
      <Grid gutter="lg">{apps}</Grid>
    </div>
  );
}
