import Navigation from '../components/Navigation/Navigation';
import { Grid } from '@mantine/core';
import { Outlet } from 'react-router-dom'; 

const Dashboard = () => {
    return (
        <Grid columns={24}>
            <Grid.Col span={4} md={3} style={{ background: '#f0f0f0', height: 'calc(100vh - 60px)' }}>
                <Navigation />
            </Grid.Col>
            <Grid.Col span={20} md={9}> 
                <Outlet /> 
            </Grid.Col>
        </Grid>
    );
};

export default Dashboard;
