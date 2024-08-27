import React from 'react';
import { Container, Grid, Paper } from "@mui/material";
import CardFour from './pages/CardFour.js';
import CardOne from './pages/CardOne.js';
import CardThree from './pages/CardThree.js';
import CardTwo from './pages/CardTwo.js';
import ChartOne from './pages/ChartOne.js';
import ChartThree from './pages/ChartThree.js';
import ChartTwo from './pages/ChartTwo.js';
import ChatCard from './pages/ChatCard.js';
import TableOne from './pages/TableOne.js';

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* 카드 4개 */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3}><CardOne /></Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3}><CardTwo /></Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3}><CardThree /></Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3}><CardFour /></Paper>
        </Grid>

        {/* 차트들 */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}><ChartOne /></Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}><ChartTwo /></Paper>
        </Grid>

        {/* Top Channels */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}><TableOne /></Paper>
        </Grid>

        {/* 원형차트 */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3}><ChartThree /></Paper>
        </Grid>

        

        {/* Chat Card */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3}><ChatCard /></Paper>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Dashboard;