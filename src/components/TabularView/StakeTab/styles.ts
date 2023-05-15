import { TabList } from '@mui/lab';
import { Box, Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: 'bold',
  textTransform: 'capitalize',
  fontFamily: '"Roboto", sans-serif',
  fontSize: '1.125rem',
  color: active ? theme.palette.common.black : theme.palette.text.hint
}));

export const LabelStatus = styled(Box)(({ theme }) => ({
  textTransform: 'uppercase',
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  fontFamily: '"Roboto", sans-serif',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  borderRadius: 4,
  height: '60%',
  width: 'max-content'
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main}!important;
`;

export const StyledTabList = styled(TabList)`
  & > div > div {
    justify-content: flex-start;
  }
`;

export const TableSubTitle = styled('span')(({ theme }) => ({
  color: theme.palette.grey[300],
  fontSize: '0.75rem',
  fontWeight: 'var(--font-weight-normal)'
}));

export const TableSubContent = styled('span')(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: '0.75rem',
  fontWeight: 'var(--font-weight-normal)'
}));

export const ButtonFilter = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.875rem',
  color: theme.palette.green[600],
  textTransform: 'none',
  background: 'rgba(67, 143, 104, 0.1)',
  borderRadius: 5,
  margin: '15px 0 15px 15px'
}));

export const TextResult = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: '0.875rem'
}));

export const WrapWalletLabel = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.875rem',
  fontWeight: 500
}));

export const TabHead = styled(Box)<{ active?: number }>(
  ({ active, theme }) => `
  color: ${active ? '#438F68' : '#98A2B3'} !important;
`
);
