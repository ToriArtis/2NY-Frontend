import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CardThree = () => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box border="1px solid #cecece" borderRadius="50%" p={1} mr={2}>
            <ShoppingBagIcon color="primary" />
          </Box>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          2,450
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Product
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="body2" color="success.main">
            2.59%
          </Typography>
          {/* You can use MUI icons for the arrow */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardThree;