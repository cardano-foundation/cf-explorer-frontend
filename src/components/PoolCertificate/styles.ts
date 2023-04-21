import { Box, styled } from "@mui/system";
import { AIcon } from "../../commons/resources";

export const WrapperGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
`;
export const WrapperGridItem = styled(Box)`
  background: ${props => props.theme.palette.grey[100]};
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ItemTitle = styled('span')`
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.palette.grey[400]};
`;

export const HashText = styled('span')`
  font-weight: 500;
  color: ${props => props.theme.palette.secondary.main};
  font-size: 14px;
`;

export const PreviousText = styled('span')`
  color: ${props => props.theme.palette.grey[400]};
  font-size: 12px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const PreviousIcon = styled(AIcon)`
  path {
    fill: ${props => props.theme.palette.grey[400]};
  }
`;
