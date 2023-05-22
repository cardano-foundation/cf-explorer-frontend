import { Box, styled, Tab } from "@mui/material";

export const TabTitle = styled("h3")`
  margin: 0px;
  color: ${({ theme }) => theme.palette.text.hint};
  text-align: left;
  text-transform: capitalize !important;

  &.active {
    color: ${({ theme }) => theme.palette.common.black};
  }
`;

export const WrapTab = styled(Tab)`
  max-width: unset;
  padding: 12px 0;
  margin-right: 30px;
`;

export const TabLabel = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    lineHeight: "16px"
  }
}));
