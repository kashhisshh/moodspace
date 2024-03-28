import Navigation from "../components/Navigation/Navigation";
import { Container, Grid } from "@mantine/core";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container fluid p={0}>
      <Grid columns={24}>
      <Grid.Col span={4} md={3}>
        <Navigation />
      </Grid.Col>
      <Grid.Col span={20} md={9}>
        <Outlet />
      </Grid.Col>
    </Grid>
    </Container>
    
  );
};

export default Dashboard;
