import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const CardFour = () => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box border="1px solid #cecece" borderRadius="50%" p={1} mr={2}>
            <PeopleAltIcon color="primary" />
          </Box>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          3,456
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Users
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="body2" color="success.main">
            0.95%
          </Typography>
          {/* You can use MUI icons for the arrow */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardFour;