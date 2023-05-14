import { alpha, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const Img = styled('img')(() => ({
  display: 'flex',
  alignItems: 'center'
}));

export const Icon = styled('img')(() => ({
  paddingRight: '10px',
  width: '35px'
}));

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: '0px 4px',
  textTransform: 'uppercase',
  borderRadius: '2px',
  padding: '2px 10px',
  backgroundColor: alpha(theme.palette.grey[300], 0.2),
  color: `${theme.palette.grey[400]} !important`,
  fontSize: 'var(--font-size-text)',
  lineHeight: '1.5rem',
  fontWeight: 'bold',
  display: 'inline',
  whiteSpace: 'nowrap'
}));
