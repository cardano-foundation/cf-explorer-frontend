import { Box, styled } from '@mui/material';

// export const BoxRaised = styled.div`
//   background: ${({ theme }) => theme.palette.background.paper};
//   box-shadow: ${(props) => props.theme.shadow.card};
//   padding: 20px;
//   border-radius: 12px;
// `
export const BoxRaised = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  // boxShadow: theme.shadow.card,
  padding: '20px',
  borderRadius: '12px'
}));
// .div`
//   background: ${({ theme }) => theme.palette.background.paper};
//   box-shadow: ${(props) => props.theme.shadow.card};
//   padding: 20px;
// border-radius: 12px;
// `
