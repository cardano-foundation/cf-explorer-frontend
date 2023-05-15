import { Box, Button, Skeleton as SkeletonMUI, styled } from '@mui/material';
import { BoxRaised } from '../../../commons/BoxRaised';
import { TypeChart } from '.';

export const Tabs = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    textAlign: 'end'
  },
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
    overflow: 'auto'
  }
}));

export const Tab = styled(Button)<{ active: number }>(({ theme, active }) => ({
  textTransform: 'lowercase',
  borderRadius: 10,
  border: `2px solid ${theme.palette.green[800_20]}`,
  marginRight: theme.spacing(1),
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
  fontWeight: 'bold',
  backgroundColor: active ? theme.palette.primary.main : 'none',
  ':hover': {
    color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
    backgroundColor: active ? theme.palette.primary.main : 'none'
  },
  [theme.breakpoints.down('sm')]: {
    border: `1.5px solid ${theme.palette.green[800_20]}`,
    borderRadius: 5,
    height: 28
  }
}));
export const TransactionContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 20px;
  height: calc(100% - 56px);
  [class*='highcharts-container'] {
    height: 230px;
    max-height: 300px;
    width: 100%;
    [class*='highcharts-xaxis-labels'] {
      background: red;
      text {
        &:last-child {
          text-anchor: end !important;
        }
      }
    }
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding: 25px 15px;
    height: auto;
  }
`;

export const WrapHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

export const Title = styled('h3')`
  position: relative;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: '';
    width: 50px;
    height: 4px;
    background: var(--color-green-light);
  }
`;

export const BoxInfo = styled(Box)(({ theme }) => ({
  height: `calc(88% - ${theme.spacing(3)} - ${theme.spacing(3)})`,
  border: '1px solid rgba(0,0,0,0.5)',
  minHeight: '200px',
  borderRadius: '12px',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    border: 'none',
    padding: 0,
    minHeight: 0,
    gap: 20
  }
}));
export const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
export const Skeleton = styled(SkeletonMUI)(() => ({
  height: 300,
  borderRadius: 12
}));

export const ColorChart = styled(Box)<{ type: TypeChart }>(({ theme, type }) => {
  const bgColor = (type: TypeChart) => {
    switch (type) {
      case 'trx':
        return theme.palette.yellow[600];
      case 'simple':
        return theme.palette.blue[800];
      case 'complex':
        return theme.palette.green[600];

      default:
        return theme.palette.yellow[600];
    }
  };

  return {
    width: '38px',
    height: '38px',
    borderRadius: '5px',
    background: bgColor(type),
    marginRight: theme.spacing(3)
  };
});
