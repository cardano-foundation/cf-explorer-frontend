import { Typography, styled } from "@mui/material";

export const TableTittle = styled(Typography)`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 36px;
  font-weight: 700;
`;

export const ADAValueLabel = styled(Typography)`
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.primary};
  display: inline-flex;
  gap: 4px;
  align-items: center;
`;
