import { Box, styled } from "@mui/material";

export const TextLabel = styled("div")`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.palette.secondary.light};
  width: 130px;
`;

export const TextValue = styled(Box)`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
`;
