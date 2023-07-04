import { Box, styled } from "@mui/material";

export const TextLabel = styled("div")`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #667085;
  width: 130px;
`;

export const TextValue = styled(Box)`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.blue[800]};
`;

export const TextRightValue = styled("div")`
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
