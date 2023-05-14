import { Box, Button, Container, Grid, styled } from '@mui/material';

export const DashboardCardList = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 45px;
`;

export const DashboardContainer = styled(Container)`
  box-sizing: border-box;
`;

export const DownloadButtonAll = styled(Button)`
  text-transform: capitalize;
  font-weight: 700;
  font-size: 14px;
`;

export const GridContainer = styled(Grid)`
  margin-bottom: 35px;
`;

export const Status = styled('span')<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  background-color: ${({ status }) => (status === 'GENERATED' ? 'rgba(16, 138, 239, 0.2)' : 'rgba(255, 168, 0, 0.2)')};
  color: ${({ status }) => (status === 'GENERATED' ? '#108AEF' : '#FFA800')};
`;

export const TextHeadline = styled('span')`
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #000000;
  margin-bottom: 14px;
`;
