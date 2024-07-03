import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              회사 소개
            </Typography>
            <Typography variant="body2" color="text.secondary">
              우리는 혁신적인 솔루션을 제공하는 기업입니다. 고객의 니즈를 충족시키기 위해 항상 노력하고 있습니다.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              연락처
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, USA 12345
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              팔로우
            </Typography>
            <IconButton aria-label="facebook" color="primary">
              <Facebook />
            </IconButton>
            <IconButton aria-label="twitter" color="primary">
              <Twitter />
            </IconButton>
            <IconButton aria-label="instagram" color="primary">
              <Instagram />
            </IconButton>
            <IconButton aria-label="linkedin" color="primary">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://your-website.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;