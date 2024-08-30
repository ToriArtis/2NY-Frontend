import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, ButtonGroup } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { itemList } from '../../items/api/itemApi';

const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Sales',
        data: [],
      },
    ],
  });

  const [period, setPeriod] = useState('day');

  // 차트 옵션
  const [options, setOptions] = useState({
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
    },
  });

  useEffect(() => {
    fetchSalesData();
  }, [period]);

  // 판매 데이터 가져오는 함수
  const fetchSalesData = async () => {
    try {
      const response = await itemList(0, 1000);  // 모든 아이템 가져오기
      const items = response.content;
      
      const { salesData, categories } = processData(items, period);
      
      setState({
        series: [
          {
            name: 'Sales',
            data: salesData,
          },
        ],
      });

      // xaxis 라이브러리 사용해서 일,주간,월별 레이블 표시
      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: categories,
        }
      }));
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  // 아이템 데이터를 차트 데이터로 변환
  const processData = (items, period) => {
    const now = new Date();
    let salesData = [];
    let categories = [];

    switch (period) {
      case 'day':
        // 시간별 판매량
        salesData = new Array(24).fill(0);
        categories = Array.from({length: 24}, (_, i) => `${i}:00`);
        items.forEach(item => {
          const createdDate = new Date(item.createdAt);
          if (createdDate.toDateString() === now.toDateString()) {
            salesData[createdDate.getHours()] += item.sales;
          }
        });
        break;

      case 'week':
        // 이번주 일별 판매량
        salesData = new Array(7).fill(0);
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        categories = Array.from({length: 7}, (_, i) => {
          const day = new Date(weekStart);
          day.setDate(weekStart.getDate() + i);
          return day.toLocaleDateString('en-US', { weekday: 'short' });
        });
        items.forEach(item => {
          const createdDate = new Date(item.createdAt);
          const diffDays = Math.floor((createdDate - weekStart) / (24 * 60 * 60 * 1000));
          if (diffDays >= 0 && diffDays < 7) {
            salesData[diffDays] += item.sales;
          }
        });
        break;

      case 'month':
        // 이번달 일별 판매량
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        salesData = new Array(daysInMonth).fill(0);
        categories = Array.from({length: daysInMonth}, (_, i) => `${i + 1}`);
        items.forEach(item => {
          const createdDate = new Date(item.createdAt);
          if (createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()) {
            salesData[createdDate.getDate() - 1] += item.sales;
          }
        });
        break;
    }

    return { salesData, categories };
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" gutterBottom>매출현황</Typography>
          </Box>
          <ButtonGroup size="small">
            <Button onClick={() => handlePeriodChange('day')} variant={period === 'day' ? 'contained' : 'outlined'}>Day</Button>
            <Button onClick={() => handlePeriodChange('week')} variant={period === 'week' ? 'contained' : 'outlined'}>Week</Button>
            <Button onClick={() => handlePeriodChange('month')} variant={period === 'month' ? 'contained' : 'outlined'}>Month</Button>
          </ButtonGroup>
        </Box>
        <ReactApexChart
          options={options}
          series={state.series}
          type="area"
          height={380}
        />
      </CardContent>
    </Card>
  );
};

export default ChartOne;