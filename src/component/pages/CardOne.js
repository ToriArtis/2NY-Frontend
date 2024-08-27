import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CardOne = () => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box border="1px solid #cecece" borderRadius="50%" p={1} mr={2}>
            <VisibilityIcon color="primary" />
          </Box>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          $3,456K
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total views
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="body2" color="success.main">
            0.43%
          </Typography>
          {/* You can use MUI icons for the arrow */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardOne;