import { Box, styled, IconButton as IconButtonMui } from '@mui/material';
import { Link } from 'react-router-dom';

export const HoldBox = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
  borderRadius: '10px',
  marginRight: theme.spacing(5),
  position: 'relative',
  background: theme.palette.common.white,
  '::after': {
    content: '"POOL HOLD"',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: theme.palette.common.white,
    padding: '6px 8px',
    fontSize: '14px',
    position: 'absolute',
    top: '-50%',
    left: theme.spacing(2),
    background: theme.palette.red[600],
    transform: ' translate(0, 60%)'
  }
}));
export const FeeBox = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
  borderRadius: '10px',
  background: theme.palette.common.white,
  marginRight: theme.spacing(5),
  position: 'relative',
  '::after': {
    content: '"FEES"',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: theme.palette.common.white,
    padding: '6px 8px',
    fontSize: '14px',
    position: 'absolute',
    top: '-50%',
    left: theme.spacing(2),
    background: theme.palette.red[600],
    transform: ' translate(0, 60%)'
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.grey[100]
}));
export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));

export const Info = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(2)
}));
export const InfoText = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: '14px'
}));

export const PoolName = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  bottom: '30%',
  color: theme.palette.grey[400],
  fontWeight: 500,
  transform: 'translate(-50%, 0)',
  maxWidth: '70%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));
export const ButtonSPO = styled(Box)(() => ({
  position: 'absolute',
  bottom: '12%',
  padding: 0,
  zIndex: 3
}));
export const PoolNamePopup = styled(Link)(({ theme }) => ({
  fontSize: '1.125rem',
  color: `${theme.palette.blue[800]} !important`,
  textDecoration: 'underline !important',
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`,
  maxWidth: 180,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));
