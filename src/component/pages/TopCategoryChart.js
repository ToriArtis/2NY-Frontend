import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { itemList } from '../../items/api/itemApi';

const TopCategoryChart = () => {
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
      
      const now = new Date();
      const categoryData = items.reduce((acc, item) => {
        const itemDate = new Date(item.createdAt);
        
        // timeFrame에 따라 필터링
        if (timeFrame === 'Monthly' && (
          itemDate.getMonth() === now.getMonth() &&
          itemDate.getFullYear() === now.getFullYear()
        )) {
          // 월별 데이터
          if (!acc[item.category]) {
            acc[item.category] = 0;
          }
          acc[item.category] += item.sales;
        } else if (timeFrame === 'Yearly' && itemDate.getFullYear() === now.getFullYear()) {
          // 연도별 데이터
          if (!acc[item.category]) {
            acc[item.category] = 0;
          }
          acc[item.category] += item.sales;
        }
        
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
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            카테고리별 매출 분석
          </Typography>
          <Select value={timeFrame} onChange={handleTimeFrameChange} size="small">
            <MenuItem value="Monthly">월간</MenuItem>
            <MenuItem value="Yearly">연간</MenuItem>
          </Select>
        </Box>
        <Box width="100%" height="350px">
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="donut"
            width="100%"
            height="100%"
          />
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2}>
          {chartData.labels.map((category, index) => (
            <Box key={index} display="flex" alignItems="center" mr={2} mb={1}>
              <Box width={12} height={12} bgcolor={options.colors[index]} mr={1} />
              <Typography variant="body2">
                {category}: {((chartData.series[index] / chartData.series.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopCategoryChart;