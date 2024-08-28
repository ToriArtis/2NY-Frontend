import React, { useState, useEffect } from 'react';
import { Card, Box, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import { itemList } from '../../items/api/itemApi';
import { getImageUrl } from '../../config/app-config';

const TableOne = () => {
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    fetchTopItems();
  }, []);

  // 상위 5개 아이템을 가져오는 함수
  const fetchTopItems = async () => {
    try {
      const response = await itemList(0, 1000);  // 모든 아이템 가져오기
      const items = response.content;

      // 판매량 내림차순
      const sortedItems = items.sort((a, b) => b.sales - a.sales);

      const totalSales = items.reduce((acc, item) => acc + item.sales, 0);

      const top5Items = sortedItems.slice(0, 5).map(item => ({
        id: item.itemId,
        title: item.title,
        thumbnail: item.thumbnail,
        revenues: `₩${(item.price * item.sales).toLocaleString()}`,  // 총 수익
        sales: item.sales,
        conversion: `${((item.sales / totalSales) * 100).toFixed(1)}%`  // 전체 판매량 대비 비율
      }));

      setTopItems(top5Items);
    } catch (error) {
      // console.error('Error fetching top items:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>상위 상품 목록</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>상품</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">총 수익</TableCell>
                <TableCell align="right">총 판매량</TableCell>
                <TableCell align="right">판매 비율</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <Avatar src={getImageUrl(item.thumbnail)} variant="square" sx={{ marginRight: 2 }} />
                      {item.title}
                    </Box>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{item.revenues}</TableCell>
                  <TableCell align="right">{item.sales}</TableCell>
                  <TableCell align="right">{item.conversion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TableOne;