import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { itemList } from '../../items/api/itemApi';

const ChartThree = () => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  const [timeFrame, setTimeFrame] = useState('Monthly');

  useEffect(() => {
    fetchCategoryData();
  }, [timeFrame]);

  const fetchCategoryData = async () => {
    try {
      const response = await itemList(0, 1000);  // 모든 아이템 가져오기
      const items = response.content;
      
      // 카테고리별 판매량 집계
      const categoryData = items.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = 0;
        }
        acc[item.category] += item.sales;
        return acc;
      }, {});

      // 차트 데이터 형식으로 변환
      const series = Object.values(categoryData);
      const labels = Object.keys(categoryData);

      setChartData({ series, labels });
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const options = {
    chart: {
      type: 'donut',
    },
    colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B', '#DC2626'],
    labels: chartData.labels,
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

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">상품 카테고리 매출 분석</Typography>
          <Select value={timeFrame} onChange={handleTimeFrameChange} size="small">
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </Box>
        <ReactApexChart
          options={options}
          series={chartData.series}
          type="donut"
          height={350}
        />
        <Grid container spacing={2} mt={2}>
          {chartData.labels.map((category, index) => (
            <Grid item xs={6} key={index}>
              <Box display="flex" alignItems="center">
                <Box width={16} height={16} bgcolor={options.colors[index]} mr={1} />
                <Typography variant="body2">
                  {category}: {((chartData.series[index] / chartData.series.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChartThree;