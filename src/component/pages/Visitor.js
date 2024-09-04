import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material'; // Import necessary components from Material-UI
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Visitor = () => {
    const [visitorData, setVisitorData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await fetch('https://accounts.google.com/o/oauth2/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
                        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
                        refresh_token: process.env.REACT_APP_OAUTH_REFRESH_TOKEN,
                        grant_type: 'refresh_token',
                    }),
                });
                const tokenData = await tokenResponse.json();

                const reportResponse = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${process.env.REACT_APP_GA4_PROPERTY_ID}:runReport`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${tokenData.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                        dimensions: [{ name: 'date' }],
                        metrics: [
                            { name: 'activeUsers' },
                            { name: 'sessions' },
                        ],
                    }),
                });
                const reportData = await reportResponse.json();

                const processedData = reportData.rows.map(row => ({
                    date: row.dimensionValues[0].value,
                    activeUsers: parseInt(row.metricValues[0].value),
                    sessions: parseInt(row.metricValues[1].value),
                }));

                processedData.sort((a, b) => a.date.localeCompare(b.date));

                setVisitorData(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!visitorData) return <div>Loading...</div>;

    const today = visitorData[visitorData.length - 1];
    const yesterday = visitorData[visitorData.length - 2];
    const totalVisitors = visitorData.reduce((sum, day) => sum + day.activeUsers, 0);

    const formatDate = (dateString) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${month}/${day}`;
    };

    const chartData = {
        labels: visitorData.map(item => formatDate(item.date)),
        datasets: [
            {
                label: '방문자 수',
                data: visitorData.map(item => item.activeUsers),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: '조회수',
                data: visitorData.map(item => item.sessions),
                borderColor: 'rgb(128, 128, 128)',
                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 15,
                    textAlign: 'left',
                },
                position: 'top',
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>방문자 통계</Typography>
                <div>
                    <span>오늘 방문수: {today.activeUsers}</span>
                    <span>어제 방문수: {yesterday.activeUsers}</span>
                    <span>누적 방문수: {totalVisitors}</span>
                </div>
                <div style={{ textAlign: 'center', width: '100%', height: '35vh' }}>
                    <Line data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};

export default Visitor;
