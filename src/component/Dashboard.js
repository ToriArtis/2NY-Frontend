import React from 'react';
import { Container, Grid, Paper } from "@mui/material";
import ChartOne from './pages/ChartOne.js';
import ChartThree from './pages/ChartThree.js';
import TableOne from './pages/TableOne.js';
import Visitor from './pages/Visitor.js';

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>

        {/* 방문자 통계 */}
        <Grid item xs={12} md={50}>
          <Paper elevation={3}><Visitor /></Paper>
        </Grid>

        {/* 매출표 */}
        <Grid item xs={12} md={50}>
          <Paper elevation={3}><ChartOne /></Paper>
        </Grid>

        {/* 매출 상위 품목 */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}><TableOne /></Paper>
        </Grid>

        {/* 카테고리 상위 품목 */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3}><ChartThree /></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;