import React from 'react';
import { Container, Grid, Paper } from "@mui/material";
import SalesChart from './pages/SalesChart.js';
import TopCategoryChart from './pages/TopCategoryChart.js';
import TopSalesChart from './pages/TopSalesChart.js';
import Visitor from './pages/Visitor.js';

const Dashboard = () => {
  return (
    <Container maxWidth="xl" style={{ marginTop: "3%" , marginBottom: "3%" }} >
      <Grid container spacing={3}>

        {/* 방문자 통계 */}
        <Grid item xs={12} md={50}>
          <Paper elevation={3}><Visitor /></Paper>
        </Grid>

        {/* 매출표 */}
        <Grid item xs={12} md={50}>
          <Paper elevation={3}><SalesChart /></Paper>
        </Grid>

        {/* 매출 상위 품목 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}><TopSalesChart /></Paper>
        </Grid>

        {/* 카테고리 상위 품목 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}><TopCategoryChart /></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;