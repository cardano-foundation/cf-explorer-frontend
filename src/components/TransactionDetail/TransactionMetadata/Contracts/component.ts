import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  minHight: '400px',
  background: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textOverflow: 'clip',
  padding: '25px 0'
}));

export const Img = styled('img')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '15px 0 0',
  margin: '0 auto'
}));
