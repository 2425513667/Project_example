import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import ChannelAnalysis from './ChannelAnalysis';
import AchievingRate from './AchievingRate';


const Dashboard = () => {

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <AchievingRate
              />
            </Grid>
            <Grid item lg={4} md={12} xl={9} xs={12}>
              <ChannelAnalysis 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
