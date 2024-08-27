import React from 'react';
import { Card, Box, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';

const TableOne = () => {
  const rows = [
    { brand: 'Google', visitors: '3.5K', revenues: '$5,768', sales: '590', conversion: '4.8%' },
    { brand: 'Twitter', visitors: '2.2K', revenues: '$4,635', sales: '467', conversion: '4.3%' },
    { brand: 'Github', visitors: '2.1K', revenues: '$4,290', sales: '420', conversion: '3.7%' },
    { brand: 'Vimeo', visitors: '1.5K', revenues: '$3,580', sales: '389', conversion: '2.5%' },
    { brand: 'Facebook', visitors: '1.2K', revenues: '$2,740', sales: '230', conversion: '1.9%' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Top Channels</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell align="right">Visitors</TableCell>
                <TableCell align="right">Revenues</TableCell>
                <TableCell align="right">Sales</TableCell>
                <TableCell align="right">Conversion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.brand}>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <Avatar src={`/path-to-brand-images/${row.brand.toLowerCase()}.svg`} sx={{ marginRight: 2 }} />
                      {row.brand}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.visitors}</TableCell>
                  <TableCell align="right">{row.revenues}</TableCell>
                  <TableCell align="right">{row.sales}</TableCell>
                  <TableCell align="right">{row.conversion}</TableCell>
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