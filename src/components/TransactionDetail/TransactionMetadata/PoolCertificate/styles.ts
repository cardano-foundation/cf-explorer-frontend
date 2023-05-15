import { Box, styled } from '@mui/material';

export const TextLabel = styled('div')`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #667085;
  width: 130px;
`;

export const TextValue = styled('div')`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  word-break: break-all;
`;

export const TextRightValue = styled('div')`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

export const TextNormal = styled(TextRightValue)`
  font-weight: 400;
  color: #667085;
`;

export const CardHeader = styled(Box)(({ theme }) => ({
  padding: '15px 0px',
  fontWeight: 'bold',
  color: theme.palette.grey[300],
  borderBottom: `1px solid ${theme.palette.border.main}`
}));
