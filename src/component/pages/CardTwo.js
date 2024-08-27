import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CardTwo = () => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box border="1px solid #cecece" borderRadius="50%" p={1} mr={2}>
            <ShoppingCartIcon color="primary" />
          </Box>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          $45.2K
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Profit
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="body2" color="success.main">
            4.35%
          </Typography>
          {/* You can use MUI icons for the arrow */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardTwo;
