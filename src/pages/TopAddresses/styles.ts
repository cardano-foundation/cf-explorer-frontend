import { Container, Box, styled } from "@mui/material";

export const TabTitle = styled(Box)`
  margin-bottom: 0px;
  padding-left: 8px;
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

export const StyledContainer = styled(Container)`
  margin-top: 18px;
  max-width: 95vw !important;
  .MuiSelect-select.MuiSelect-outlined {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 10px;
    margin-top: 0px !important;
  }
`;
