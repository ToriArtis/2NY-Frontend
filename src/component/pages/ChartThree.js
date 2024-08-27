import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    type: 'donut',
  },
  colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],
  labels: ['Remote', 'Hybrid', 'Onsite', 'Leave'],
  legend: {
    show: true,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree = () => {
  const [state, setState] = useState({
    series: [65, 34, 12, 56],
  });

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Visitors Analytics</Typography>
          <Select defaultValue="Monthly" size="small">
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </Box>
        <ReactApexChart
          options={options}
          series={state.series}
          type="donut"
          height={350}
        />
        <Grid container spacing={2} mt={2}>
          {['Desktop', 'Tablet', 'Mobile', 'Unknown'].map((item, index) => (
            <Grid item xs={6} key={index}>
              <Box display="flex" alignItems="center">
                <Box width={16} height={16} bgcolor={`primary.${index * 100 + 100}`} mr={1} />
                <Typography variant="body2">{item}: {state.series[index]}%</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChartThree;