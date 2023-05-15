import { styled, Button, LinearProgress, alpha } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledLinearProgress = styled(LinearProgress)`
  display: inline-block;
  width: 100%;
  height: 8px;
  border-radius: 34px;
  background: ${(props) => alpha(props.theme.palette.common.black, 0.1)};
  margin-left: 8px;
  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${(props) => props.theme.palette.gradient[0]};
  }
`;

export const PoolName = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: var(--color-blue) !important;
`;

export const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  maxWidth: 360,
  background: theme.palette.background.paper,
  padding: '0 12px',
  borderRadius: 8,
  marginBottom: 15,
  height: 35,
  [theme.breakpoints.down('sm')]: {
    width: 'unset'
  }
}));

export const StyledInput = styled('input')`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
`;

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 12.5%;
  min-width: 35px;
  width: 35px;
  height: 35px;
`;
export const Image = styled('img')`
  width: 20px;
  height: 20px;
`;
