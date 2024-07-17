import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { GitHub } from '@mui/icons-material';

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
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={textStyle}>
              <a 
              href='https://chy-0121.notion.site/ToriArtis-Do-Tori-2NY-0d36ad2cab82407aaacfe63d608474a8?pvs=4'
              style={{ textDecoration: 'none', color: '#8A8A8A' }}
              >
              서비스 소개
              </a>
            </Typography>
            <Typography variant="body2" sx={textStyle}>
              <b>To New You</b><br />
              <hr style={{ borderColor: '#8A8A8A' }} />
              새로운 당신을 위해 "To"는 목적지로 향하는 여정을 의미하며, 패션을 통한 자기 발견의 과정을 나타냅니다.<br />
             "New"는 새로움을 의미하며, 고객들이 새로운 스타일과 자신을 발견할 수 있다는 것을 나타냅니다.<br />
             "You"는 각 고객 개개인을 중요하게 여긴다는 메시지를 전달합니다.<br />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={textStyle}>
              연락처
            </Typography>
            <Typography variant="body2" sx={textStyle}>
            <b>Please Contact Us</b><br />
            <hr style={{ borderColor: '#8A8A8A' }} />
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

            <IconButton aria-label="github" color="primary">
              <GitHub 
              onClick={() => window.open('https://github.com/ToriArtis')}
                />
            </IconButton>

            <IconButton aria-label="jira" color="primary">
              <img src="/assets/jira.png" 
              onClick={() => window.open('https://toriartis.atlassian.net/jira/software/projects/NY/boards/1')} 
              style={{ maxWidth: '28px', height: 'auto' }}
              />
            </IconButton>

            <IconButton aria-label="figma" color="primary">
              <img src="/assets/figma.png" 
              onClick={() => window.open('https://www.figma.com/design/BfalW82kus5Dk5rpSRcUai/2NY?node-id=0-1&t=kae53lHwnBUHaHu8-1.com')} 
              style={{ maxWidth: '25px', height: 'auto' }}
              />
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
}

export default Footer;