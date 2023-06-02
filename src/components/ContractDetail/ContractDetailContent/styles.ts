import { Box, styled } from "@mui/material";
import { TabList } from "@mui/lab";

export const TabTitle = styled(Box)`
  margin-bottom: 0px;
  color: ${({ theme }) => theme.palette.text.hint};
  text-align: left;
  text-transform: capitalize !important;
  font-size: 18px;
  line-height: 21px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 14px;
    line-height: 16px;
  }
  &.active {
    color: ${({ theme }) => theme.palette.common.black};
  }
`;

export const TabListStyled = styled(TabList)``;
