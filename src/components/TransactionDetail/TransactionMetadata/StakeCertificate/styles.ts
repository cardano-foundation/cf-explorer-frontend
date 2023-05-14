import { styled } from '@mui/material';
import Table from '../../../commons/Table';

export const TableMinting = styled(Table)({
  '& tr th:last-child': {
    width: '120px'
  }
});

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
  color: #108aef;
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
