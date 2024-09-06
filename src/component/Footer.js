import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh', // 전체 뷰포트 높이를 사용
      }}
    >
      {children}
      <Footer />
    </Box>
  );
};

const Footer = () => {
  const textStyle = {
    color: '#8A8A8A',
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#464646',
        p: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={textStyle}>
              <Link 
                href='https://chy-0121.notion.site/ToriArtis-Do-Tori-2NY-0d36ad2cab82407aaacfe63d608474a8?pvs=4'
                sx={{ textDecoration: 'none', color: '#8A8A8A' }}
              >
                서비스 소개
              </Link>
            </Typography>
            <Typography variant="body2" sx={textStyle} gutterBottom>
              <strong>To New You</strong>
            </Typography>
            <Divider sx={{ borderColor: '#8A8A8A', my: 2 }} />
            <Typography variant="body2" sx={textStyle}>
              새로운 당신을 위해 "To"는 목적지로 향하는 여정을 의미하며, 패션을 통한 자기 발견의 과정을 나타냅니다.
            </Typography>
            <Typography variant="body2" sx={textStyle}>
              "New"는 새로움을 의미하며, 고객들이 새로운 스타일과 자신을 발견할 수 있다는 것을 나타냅니다.
            </Typography>
            <Typography variant="body2" sx={textStyle}>
              "You"는 각 고객 개개인을 중요하게 여긴다는 메시지를 전달합니다.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={textStyle}>
              연락처
            </Typography>
            <Typography variant="body2" sx={textStyle} gutterBottom>
              <strong>Please Contact Us</strong>
            </Typography>
            <Divider sx={{ borderColor: '#8A8A8A', my: 2 }} />
            <Typography variant="body2" sx={textStyle}>
              123 Main Street, Anytown, USA 12345
            </Typography>
            <Typography variant="body2" sx={textStyle}>
              Email: info@example.com
            </Typography>
            <Typography variant="body2" sx={textStyle}>
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={textStyle}>
              Links
            </Typography>
            <IconButton aria-label="github" color="primary" onClick={() => window.open('https://github.com/ToriArtis')}>
              <GitHub />
            </IconButton>
            <IconButton aria-label="jira" color="primary" onClick={() => window.open('https://toriartis.atlassian.net/jira/software/projects/NY/boards/1')}>
              <img src="/assets/jira.png" alt="Jira" style={{ width: '28px', height: '28px' }} />
            </IconButton>
            <IconButton aria-label="figma" color="primary" onClick={() => window.open('https://www.figma.com/design/BfalW82kus5Dk5rpSRcUai/2NY?node-id=0-1&t=kae53lHwnBUHaHu8-1.com')}>
              <img src="/assets/figma.png" alt="Figma" style={{ width: '25px', height: '25px' }} />
            </IconButton>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center" sx={textStyle}>
            {'Copyright © '}
            <Link href="https://chy-0121.notion.site/ToriArtis-Do-Tori-2NY-0d36ad2cab82407aaacfe63d608474a8?pvs=4" sx={{ color: '#8A8A8A' }}>
              ToriArtis
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;